import React from 'react';
import { render, fireEvent, wait, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import API from '../components/API';
import PipeCounterApp from './PipeCounterApp';

jest.mock('../components/API', () => ({
  get: jest.fn(),
}));

describe('PipeCounterApp', () => {
  beforeEach(() => {
    API.get.mockResolvedValue({
      data: ['DO-001', { DO_NUM: 'DO-002' }],
    });
    global.fetch = jest.fn();
    global.alert = jest.fn();
    global.URL.createObjectURL = jest.fn((file) => `blob:${file.name}`);
    localStorage.setItem('token', JSON.stringify({ username: 'tester' }));
  });

  afterEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  test('shows selected image files without rendering undefined file data', async () => {
    render(<PipeCounterApp />);
    await wait(() => expect(API.get).toHaveBeenCalled());

    expect(screen.queryByText(/undefined/)).not.toBeInTheDocument();
    expect(screen.queryByText(/NaN MB/)).not.toBeInTheDocument();

    const input = document.querySelector('input[type="file"]');
    const firstFile = new File(['first'], 'first.jpg', { type: 'image/jpeg' });
    const secondFile = new File(['second'], 'second.png', { type: 'image/png' });

    fireEvent.change(input, {
      target: {
        files: [firstFile, secondFile],
      },
    });

    await wait(() => {
      expect(screen.getByText(/first\.jpg/)).toBeInTheDocument();
      expect(screen.getByText(/second\.png/)).toBeInTheDocument();
    });
    expect(screen.queryByText(/NaN MB/)).not.toBeInTheDocument();
  });

  test('keeps Save disabled until DO, counts, and files are provided', async () => {
    render(<PipeCounterApp />);
    await wait(() => expect(API.get).toHaveBeenCalled());

    const saveButton = screen.getByRole('button', { name: /save/i });
    expect(saveButton).toBeDisabled();

    fireEvent.change(screen.getByLabelText('จำนวนที่ระบบนับ'), {
      target: { value: '10' },
    });
    fireEvent.change(screen.getByLabelText('จำนวนนับจริง'), {
      target: { value: '9' },
    });

    expect(saveButton).toBeDisabled();
  });

  test('submits all selected files and form fields when saving', async () => {
    global.fetch.mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({}),
    });

    render(<PipeCounterApp />);

    await wait(() => expect(API.get).toHaveBeenCalled());

    fireEvent.mouseDown(screen.getByLabelText('DO NUM'));
    fireEvent.click(await screen.findByText('DO-001'));

    fireEvent.change(screen.getByLabelText('จำนวนที่ระบบนับ'), {
      target: { value: '10' },
    });
    fireEvent.change(screen.getByLabelText('จำนวนนับจริง'), {
      target: { value: '9' },
    });
    fireEvent.change(screen.getByLabelText('หมายเหตุ'), {
      target: { value: 'checked' },
    });

    const input = document.querySelector('input[type="file"]');
    const firstFile = new File(['first'], 'first.jpg', { type: 'image/jpeg' });
    const secondFile = new File(['second'], 'second.png', { type: 'image/png' });

    fireEvent.change(input, {
      target: {
        files: [firstFile, secondFile],
      },
    });

    fireEvent.click(screen.getByRole('button', { name: /save/i }));

    await wait(() => expect(global.fetch).toHaveBeenCalledTimes(1));
    const [, requestOptions] = global.fetch.mock.calls[0];
    const formData = requestOptions.body;

    const submittedFiles = formData.getAll('file[]');
    expect(submittedFiles).toHaveLength(2);
    expect(submittedFiles.map((file) => file.name)).toEqual(['first.jpg', 'second.png']);
    expect(submittedFiles.map((file) => file.type)).toEqual(['image/jpeg', 'image/png']);
    expect(formData.get('do_num')).toBe('DO-001');
    expect(formData.get('qty_system')).toBe('10');
    expect(formData.get('qty_human')).toBe('9');
    expect(formData.get('user')).toBe('tester');
    expect(formData.get('remark')).toBe('checked');
    expect(global.alert).toHaveBeenCalledWith('บันทึกข้อมูลเรียบร้อยแล้ว');
  });
});
