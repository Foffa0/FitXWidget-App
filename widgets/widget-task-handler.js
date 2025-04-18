import React from 'react';
import { StudioInfoWidget } from './studioInfoWidget';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


const nameToWidget = {
  // studioWidget will be the **name** with which we will reference our widget.
  studioWidget: StudioInfoWidget,
};

const getCapacity = async function() {
  const magiclineId = await AsyncStorage.getItem('fitx-magicline-id');
  let data = [];
  try {
    await axios.get(`https://mein.fitx.de/nox/public/v1/studios/${magiclineId}/utilization`, { responseType: 'json', timeout: 10000, headers: {"x-tenant": "fitx"} })
      .then(res => {
        data = res.data;
      });
  } catch (error) { }
  finally {
    return (data);
  }
}

export async function widgetTaskHandler(props) {
  const widgetInfo = props.widgetInfo;
  const Widget = nameToWidget["studioWidget"];

  let capacity;
  let percentage;

  switch (props.widgetAction) {
    case 'WIDGET_ADDED':
      const name = await AsyncStorage.getItem('fitx-name');
      capacity = await getCapacity();
      percentage = "---";
      capacity.items.forEach(item => {
        if (item.isCurrent)
        {
          percentage = item.percentage;
        }
      });
      props.renderWidget(<StudioInfoWidget title={name} capacity={String(percentage) + '%'} />);
      break;

    case 'WIDGET_UPDATE':
    case 'WIDGET_RESIZED':
      capacity = await getCapacity();
      percentage = "---";
      capacity.items.forEach(item => {
        if (item.isCurrent)
        {
          percentage = item.percentage;
        }
      });
      props.renderWidget(<StudioInfoWidget title={await AsyncStorage.getItem('fitx-name')} capacity={String(percentage) + '%'} />);
      break;

    case 'WIDGET_DELETED':
      // Not needed for now
      break;

    case 'WIDGET_CLICK':
      capacity = await getCapacity();
      percentage = "---";
      capacity.items.forEach(item => {
        if (item.isCurrent)
        {
          percentage = item.percentage;
        }
      });
      props.renderWidget(<StudioInfoWidget title={await AsyncStorage.getItem('fitx-name')} capacity={String(percentage) + '%'} />);
      break;

    default:
      break;
  }
}