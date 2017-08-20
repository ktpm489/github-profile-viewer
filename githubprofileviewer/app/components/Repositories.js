import React, { Component } from 'react';
import {
    Text,
    TouchableHighlight,
    StyleSheet,
    ScrollView,
    View
} from 'react-native';
import PropTypes from 'prop-types';

import Badge from './Badge';
import Separator from './Separator';
import WebViewPage from './WebViewPage';

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    rowContainer: {
        flexDirection: 'column',
        flex: 1,
        padding: 10
    },
    name: {
        color: '#48BBEC',
        fontSize: 18,
        paddingBottom: 5
    },
    stars: {
        color: '#48BBEC',
        fontSize: 14,
        paddingBottom: 5
    },

    description: {
        fontSize: 14,
        paddingBottom: 5
    }
})

class Repositories extends Component {
    openPage(url) {
        this.props.navigator.push({
            component: WebViewPage,
            title: 'Web View',
            passProps: {url}
        })
    }
    render() {
        const repos = this.props.repos;
        const list = repos.map((repo, index) => {
            const descriptionText = repo.description;
            const desc = descriptionText
                ? <Text style={styles.description}>{descriptionText}</Text>
                : <View />

            return (
                <View key={repo.id}>
                    <View style={styles.rowContainer}>
                        <TouchableHighlight
                            onPress={this.openPage.bind(this, repo.html_url)}
                            underlayColor='transparent'>
                            <Text style={styles.name}>{repo.name}</Text>
                        </TouchableHighlight>
                        <Text style={styles.stars}> Stars: {repo.stargazers_count}</Text>
                        {desc}
                    </View>
                    <Separator />
                </View>
            )
        });
        return (
            <ScrollView style={styles.container}>
                <Badge userInfo={this.props.userInfo} />
                {list}
            </ScrollView>
        );
    }
}

export default Repositories;

Repositories.propTypes = {
    userInfo: PropTypes.object.isRequired,
    repos: PropTypes.array.isRequired
}