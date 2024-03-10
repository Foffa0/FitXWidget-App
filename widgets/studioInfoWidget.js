import React from 'react';
import { FlexWidget, TextWidget, SvgWidget, OverlapWidget } from 'react-native-android-widget';
import { COLORS, icons } from '../constants';

export function StudioInfoWidget({title, capacity}) {
  return (
    <FlexWidget clickAction="OPEN_APP"
      style={{
        height: 'match_parent',
        width: 'match_parent',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.dark,
        borderRadius: 16,
      }}
    >
      <OverlapWidget>
        <FlexWidget
          style={{
            height: 'match_parent',
            width: 'match_parent',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <SvgWidget
            svg={icons.circle}
            style={{ height: 72, width: 72 }}
          />
        </FlexWidget>
        <FlexWidget
          style={{
            height: 'match_parent',
            width: 'match_parent',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <TextWidget
            text={capacity}
            style={{
              fontSize: 20,
              color: '#ffffff',
            }}
          />
        </FlexWidget>
      </OverlapWidget>
      <TextWidget
            text={title}
            style={{
              fontSize: 12,
              color: '#ffffff',
            }}
          />
    </FlexWidget>
  );
}