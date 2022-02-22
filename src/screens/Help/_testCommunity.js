import {localNotif} from '../../NotifManager'

const test = () => {
    const channel = 'community-channel'

    const title = `MistSwap has just been added!`

    const message = {
        body: `Now you can trade MistSwap while on-the-go. Try it out TODAY! ;-)`,
        subText: 'Community Bulletin',
    }

    localNotif(channel, title, message)
}

export default test
