import React from 'react'
import {
	Share,
	Button
} from 'react-native';

export class ShareButton extends React.Component {
	shareApp = () => {
		Share.share({
			message: 'Join some broski\'s today! Download BroTalk on Google Play or the App Store!',
			title: 'BroTalk share'
		}, {
			dialogTitle: 'Share Bros!'
		})
		.then(res => console.log(res))
		.catch(err => console.log(err));
	}

	render() {
		return (
			<Button
				title="Share to your Bros!"
				onPress={() => this.shareApp()}
			/>
			);
	}
}