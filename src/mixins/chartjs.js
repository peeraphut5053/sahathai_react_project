import ChartJS from 'chart.js/auto';

const migrateLegacyTooltipCallbacks = (callbacks) => {
  if (!callbacks) {
    return callbacks;
  }

  return {
    ...callbacks,
    label: callbacks.label
      ? (context) => callbacks.label({
        datasetIndex: context.datasetIndex,
        index: context.dataIndex,
        label: context.label,
        value: context.raw,
        xLabel: context.label,
        yLabel: context.parsed?.y ?? context.raw
      }, context.chart.data)
      : undefined
  };
};

const migrateLegacyTooltip = (tooltip, chart) => {
  if (!tooltip) {
    return tooltip;
  }

  const nextTooltip = {
    ...tooltip,
    bodyColor: tooltip.bodyColor || tooltip.bodyFontColor,
    footerColor: tooltip.footerColor || tooltip.footerFontColor,
    titleColor: tooltip.titleColor || tooltip.titleFontColor
  };

  if (tooltip.callbacks) {
    nextTooltip.callbacks = migrateLegacyTooltipCallbacks(tooltip.callbacks);
  }

  if (tooltip.custom && !tooltip.external) {
    nextTooltip.external = (context) => {
      const { tooltip: tooltipModel } = context;
      tooltipModel._bodyFontFamily = tooltipModel.options.bodyFont.family;
      tooltipModel._bodyFontStyle = tooltipModel.options.bodyFont.style;
      tooltipModel.bodyFontSize = tooltipModel.options.bodyFont.size;
      tooltipModel.xPadding = tooltipModel.options.padding;
      tooltipModel.yPadding = tooltipModel.options.padding;
      tooltip.custom.call({ _chart: chart }, tooltipModel);
    };
  }

  delete nextTooltip.bodyFontColor;
  delete nextTooltip.footerFontColor;
  delete nextTooltip.titleFontColor;
  delete nextTooltip.custom;

  return nextTooltip;
};

const migrateLegacyAxis = (axis) => {
  if (!axis) {
    return axis;
  }

  const { gridLines, scaleLabel, ticks, ...rest } = axis;

  return {
    ...rest,
    grid: gridLines
      ? {
        borderDash: gridLines.borderDash,
        borderDashOffset: gridLines.borderDashOffset,
        color: gridLines.color,
        display: gridLines.display,
        drawBorder: gridLines.drawBorder
      }
      : rest.grid,
    ticks: ticks
      ? {
        ...ticks,
        color: ticks.color || ticks.fontColor
      }
      : rest.ticks,
    title: scaleLabel
      ? {
        display: scaleLabel.display,
        font: {
          weight: scaleLabel.fontStyle
        },
        text: scaleLabel.labelString
      }
      : rest.title
  };
};

const migrateLegacyChartOptions = (options, chart) => {
  if (!options) {
    return;
  }

  options.plugins = options.plugins || {};

  if (options.legend && !options.plugins.legend) {
    options.plugins.legend = options.legend;
  }

  if (options.tooltips && !options.plugins.tooltip) {
    options.plugins.tooltip = migrateLegacyTooltip(options.tooltips, chart);
  }

  if (typeof options.cutoutPercentage !== 'undefined' && typeof options.cutout === 'undefined') {
    options.cutout = `${options.cutoutPercentage}%`;
  }

  if (options.scales?.xAxes || options.scales?.yAxes) {
    const { xAxes, yAxes, ...scales } = options.scales;
    const nextScales = { ...scales };

    if (xAxes?.[0] && !nextScales.x) {
      nextScales.x = migrateLegacyAxis(xAxes[0]);
    }

    if (yAxes?.[0] && !nextScales.y) {
      nextScales.y = migrateLegacyAxis(yAxes[0]);
    }

    if (yAxes?.length > 1) {
      yAxes.forEach((axis) => {
        if (axis.id && !nextScales[axis.id]) {
          nextScales[axis.id] = migrateLegacyAxis(axis);
        }
      });
    }

    options.scales = nextScales;
  }

  delete options.legend;
  delete options.tooltips;
  delete options.cutoutPercentage;
};

ChartJS.register({
  id: 'legacyOptionsMigration',
  beforeInit: (chart) => {
    migrateLegacyChartOptions(chart.config.options, chart);
  }
});
