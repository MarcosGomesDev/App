import React from 'react';
import { View, Image, StyleSheet} from 'react-native';

import { heightPercent, widthPercent } from '../../utils/dimensions';
import Container from '../../components/Container';
import LottieView from 'lottie-react-native';

const Loading = () => {
    return (
        <Container>
            <View style={styles.container}>
                <Image source={require('../../assets/Logo.png')} style={styles.image} />
                <LottieView
                    style={{
                        width: widthPercent(100),
                        height: heightPercent(30),
                    }}
                    source={require('../../assets/loading.json')}
                    autoPlay={true}
                    loop={true}
                />
            </View>
        </Container>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    image: {
        width: widthPercent(60),
        height: heightPercent(40),
    },
    loading: {
        marginTop: heightPercent(10),
    }
});

export default Loading;