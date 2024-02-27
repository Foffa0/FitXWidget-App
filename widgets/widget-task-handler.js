import React from 'react';
import { WidgetTaskHandlerProps } from 'react-native-android-widget';
import { StudioInfoWidget } from './studioInfoWidget';

const nameToWidget = {
  // studioWidget will be the **name** with which we will reference our widget.
  studioWidget: StudioInfoWidget,
};

export async function widgetTaskHandler(props) {
  const widgetInfo = props.widgetInfo;
  const Widget = nameToWidget["studioWidget"];

  switch (props.widgetAction) {
    case 'WIDGET_ADDED':
      props.renderWidget(<StudioInfoWidget title={"Fitx text"} cacpacity={"90%"} />);
      break;

    case 'WIDGET_UPDATE':
      props.renderWidget(<StudioInfoWidget title={"Fitx text"} cacpacity={"90%"} />);
      break;

    case 'WIDGET_RESIZED':
      // Not needed for now
      break;

    case 'WIDGET_DELETED':
      // Not needed for now
      break;

    case 'WIDGET_CLICK':
      // Not needed for now
      break;

    default:
      break;
  }
}