
import React, { Component } from 'react';
import {Dimensions, PixelRatio } from 'react-native';

export const widthPercent = widthPercent => {
    const width = Dimensions.get('window').width
    return PixelRatio.roundToNearestPixel(width * parseFloat(widthPercent) / 100)
}

export const heightPercent = heightPercent => {
    const height = Dimensions.get('window').height
    return PixelRatio.roundToNearestPixel(height * parseFloat(heightPercent) / 100)
}