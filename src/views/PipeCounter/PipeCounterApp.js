import React, { useState, useRef } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
  Grid,
  Card,
  CardContent,
  CircularProgress,
  Chip,
  makeStyles,
  createMuiTheme,
  ThemeProvider,
  IconButton
} from '@material-ui/core';
import {
  CloudUpload,
  PlayArrow,
  Refresh,
  PhotoCamera,
  Assessment,
  GetApp,
  Visibility,
  CheckCircle,
  Camera
} from '@material-ui/icons';
import { Alert } from '@material-ui/lab';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  headerPaper: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
    color: 'white',
  },
  uploadArea: {
    border: '2px dashed #ccc',
    borderRadius: theme.spacing(1),
    padding: theme.spacing(4),
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'border-color 0.3s ease',
    '&:hover': {
      borderColor: theme.palette.primary.main,
    },
    '&.dragover': {
      borderColor: theme.palette.primary.main,
      backgroundColor: theme.palette.action.hover,
    }
  },
  previewImage: {
    maxWidth: '100%',
    maxHeight: '400px',
    borderRadius: theme.spacing(1),
    boxShadow: theme.shadows[3],
  },
  resultImage: {
    maxWidth: '100%',
    borderRadius: theme.spacing(1),
    boxShadow: theme.shadows[3],
  },
  processingCard: {
    padding: theme.spacing(3),
    textAlign: 'center',
  },
  resultCard: {
    marginTop: theme.spacing(1),
  },
  actionButton: {
    margin: theme.spacing(1),
  },
  errorAlert: {
    marginTop: theme.spacing(2),
  },
  statCard: {
    padding: theme.spacing(2),
    textAlign: 'center',
    height: '100%',
  }
}));

const PipeCounterApp = () => {
  const classes = useStyles();
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const [hiddenUI, setHiddenUI] = useState(false);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const API_BASE_URL = 'http://172.18.3.140:8000';

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setResult(null);
      setError(null);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        setSelectedFile(file);
        setPreviewUrl(URL.createObjectURL(file));
        setResult(null);
        setError(null);
      }
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'environment',
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
      }
      setShowCamera(true);
    } catch (err) {
      setError('ไม่สามารถเข้าถึงกล้องได้: ' + err.message);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setShowCamera(false);
  };

  const captureImage = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(videoRef.current, 0, 0);
      
      canvas.toBlob((blob) => {
        const file = new File([blob], 'camera-capture.jpg', { type: 'image/jpeg' });
        setSelectedFile(file);
        setPreviewUrl(URL.createObjectURL(blob));
        setResult(null);
        setError(null);
        stopCamera();
      }, 'image/jpeg');
    }
  };

  const processImage = async () => {
    if (!selectedFile) {
      setError('กรุณาเลือกไฟล์รูปภาพก่อน');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);

      const response = await fetch(`${API_BASE_URL}/count-pipes`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'เกิดข้อผิดพลาดในการประมวลผล');
      }

      const data = await response.json();
      setResult(data);
      setHiddenUI(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const downloadResult = () => {
    if (result?.image_with_numbers) {
      const link = document.createElement('a');
      link.href = `data:image/png;base64,${result.image_with_numbers}`;
      link.download = 'pipe_count_result.png';
      link.click();
    }
  };

  const resetAll = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setResult(null);
    setError(null);
    setHiddenUI(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg" className={classes.root}>
        {/* Header */}
        <Paper elevation={3} className={classes.headerPaper}>
          <Box display="flex" alignItems="center" style={{ gap: '16px' }}>
            <PhotoCamera style={{ fontSize: 35 }} />
            <Box>
              <Typography style={{ fontSize: '1.5rem' }} variant="h4" component="h1">
                Pipe Counter
              </Typography>
              <Typography variant="subtitle1">
                ระบบนับท่อ
              </Typography>
            </Box>
          </Box>
        </Paper>

        <Grid container spacing={3}>
          {/* Left Column - Upload */}
          <Grid item xs={12} md={12}>
            {/* File Upload */}
            <Card hidden={hiddenUI} elevation={2} style={{ marginBottom: '8px' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  <CloudUpload style={{ verticalAlign: 'middle', marginRight: '8px' }} />
                  อัปโหลดรูปภาพ
                </Typography>
                
                <input
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="file-upload"
                  type="file"
                  onChange={handleFileSelect}
                />
                
                <label htmlFor="file-upload">
                  <Box
                    className={classes.uploadArea}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                  >
                    {showCamera ? (
                      <Box>
                        <video
                          ref={videoRef}
                          autoPlay
                          playsInline
                          style={{ width: '100%', maxHeight: '400px', borderRadius: '8px' }}
                        />
                        <Box mt={2} display="flex" justifyContent="center" gap={2}>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={captureImage}
                            startIcon={<Camera />}
                          >
                            ถ่ายภาพ
                          </Button>
                          <Button
                            variant="outlined"
                            onClick={stopCamera}
                          >
                            ยกเลิก
                          </Button>
                        </Box>
                      </Box>
                    ) : previewUrl ? (
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className={classes.previewImage}
                      />
                    ) : (
                      <Box>
                        <PhotoCamera style={{ fontSize: 48, color: '#ccc', marginBottom: '16px' }} />
                        <Typography variant="body1" color="textSecondary">
                          คลิกเพื่อเลือกไฟล์หรือถ่ายภาพ
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          รองรับไฟล์: JPG, PNG, JPEG
                        </Typography>
                        <Button
                          variant="contained"
                          color="primary"
                          startIcon={<Camera />}
                          onClick={startCamera}
                          style={{ marginTop: '16px' }}
                          disabled
                        >
                          เปิดกล้องถ่ายภาพ
                        </Button>
                      </Box>
                    )}
                  </Box>
                </label>

                {selectedFile && (
                  <Box mt={2}>
                    <Chip
                      icon={<CheckCircle />}
                      label={`${selectedFile.name} (${(selectedFile.size / 1024 / 1024).toFixed(2)} MB)`}
                      color="primary"
                      variant="outlined"
                    />
                  </Box>
                )}
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <Box display="flex" gap={1} flexWrap="wrap">
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={processImage}
                disabled={!selectedFile || loading}
                startIcon={loading ? <CircularProgress size={20} /> : <PlayArrow />}
                className={classes.actionButton}
              >
                {loading ? 'กำลังประมวลผล...' : 'เริ่มนับท่อ'}
              </Button>
              
              <Button
                variant="outlined"
                onClick={resetAll}
                startIcon={<Refresh />}
                className={classes.actionButton}
              >
                รีเซ็ตทั้งหมด
              </Button>
            </Box>

            {/* Error Display */}
            {error && (
              <Alert severity="error" className={classes.errorAlert}>
                <Typography variant="body2">{error}</Typography>
              </Alert>
            )}
          </Grid>

          {/* Right Column - Results */}
          <Grid style={{ paddingTop: '0px' }} item xs={12} md={12}>
            {loading && (
              <Card elevation={2} className={classes.processingCard}>
                <CircularProgress size={60} />
                <Typography variant="h6" style={{ marginTop: '16px' }}>
                  กำลังประมวลผลรูปภาพ...
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  โปรดรอสักครู่
                </Typography>
              </Card>
            )}

            {result && (
              <>
                {/* Statistics */}
                <Grid container spacing={2} style={{ marginBottom: '16px' }}>
                  <Grid item xs={12}>
                    <Card className={classes.statCard}>
                      <Typography variant="h4" color="primary">
                        {result.pipe_count}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        จำนวนท่อที่พบ
                      </Typography>
                    </Card>
                  </Grid>
                </Grid>

                {/* Result Image */}
                <Card elevation={2} className={classes.resultCard}>
                  <CardContent>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                      <Typography variant="h6">
                        <Assessment style={{ verticalAlign: 'middle', marginRight: '8px' }} />
                        ผลลัพธ์การนับท่อ
                      </Typography>
                      <Button
                        variant="contained"
                        color="secondary"
                        size="small"
                        onClick={downloadResult}
                        startIcon={<GetApp />}
                      >
                        ดาวน์โหลด
                      </Button>
                    </Box>
                    
                    {result.image_with_numbers && (
                      <img
                        style={{ width: '100%', height: '100%' }}
                        src={`data:image/png;base64,${result.image_with_numbers}`}
                        alt="Result"
                        className={classes.resultImage}
                      />
                    )}
                  </CardContent>
                </Card>
              </>
            )}

            {!loading && !result && !error && (
              <Card elevation={2} className={classes.processingCard}>
                <Visibility style={{ fontSize: 60, color: '#ccc', marginBottom: '16px' }} />
                <Typography variant="h6" color="textSecondary">
                  อัปโหลดรูปภาพเพื่อดูผลลัพธ์
                </Typography>
              </Card>
            )}
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default PipeCounterApp;