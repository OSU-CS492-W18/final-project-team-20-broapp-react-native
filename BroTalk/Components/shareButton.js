import React from 'react'
import {
	Share,
	Button
} from 'react-native';

export class ShareButton extends React.Component {

	shareApp = () => {
		Share.share({
			message: 'Share Button Message',
			title: 'Bro App share button'
		}, {
			dialogTitle: 'Share Dialog'
		})
		.then(res => console.log(res))
		.catch(err => console.log(err));
	}

	render() {
		return (
			<Button
				title="Share Button"
				onPress={() => this.shareApp()}
			/>
			);
	}
}