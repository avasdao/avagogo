import {localNotif} from '../../NotifManager'

const test = () => {
    const channel = 'community-channel'

    const title = `Join Our Airdrop TODAY!`

    const message = {
        body: `We'd love to share some $GOGO with you ;-)`,
        subText: 'Community Bulletin',
    }

    localNotif(channel, title, message)
}

export default test
