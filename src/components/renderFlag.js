import React, { Component } from 'react'
import { Text, View, Image } from 'react-native'
import List from './CountryList';

export default class RenderFlag extends Component {
    render() {

        const url = List.filter(item => item.name === this.props.flag)
        return (
            <Image
                source={url[0].img}
                style={{ width: 32, height: 32 }}
            />
        )
    }
}
