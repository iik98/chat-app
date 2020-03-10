import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({

    title: {
        marginBottom: -5,
    },
    foto: {
        marginRight: theme.spacing(2)
    },
    floatingBottom: {
        borderTop: "1px solid #ddd",
        position: 'fixed',
        left: 0,
        bottom: 0,
        width: "100%",
        padding: theme.spacing(1),
        zIndex: 2,
        backgroundColor: '#fff',
    },
    chatWindow: {
        width: '100%',
        margin: '0 auto',
        padding: '0 15px 15px',
        position: 'relative',
        overflowY: 'auto',
        height: 'calc(100vh - 72px)',
        backgroundColor: '#efefef',
        '@media(min-width: 320px)': {
            width: '100%',
            paddingBottom: 30,
        },
        '@media(min-width: 960px)': {
            width: '70%',
        },
    },
    chatDayWrap: {
        margin: '10px auto 15px',
        width: 140,
        backgroundColor: '#FFF',
        borderRadius: 10,
        textAlign: 'center',
    },
    chatDay: {
        color: theme.palette.textColor.gray7,
        fontWeight: 'bold',
    },
    unreadCount: {
        backgroundColor: '#06d755',
        borderRadius: 12,
        padding: '0 5px',
        textAlign: 'center',
        color: '#fff',
        height: 19,
        lineHeight: '19px',
        minWidth: 9,
        fontWeight: 500,
        verticalAlign: 'top',
        fontSize: 12,
        position: 'absolute',
        right: 7,
        bottom: 7,
    },
    yourChatBubble: {
        width: '100%',
        position: 'relative',
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'flex-start',
        margin: '0 auto 30px',
    },
    yourTextBody: {
        width: 'fit-content',
        backgroundColor: '#ffffff',
        textAlign: 'left',
        padding: 10,
        borderRadius: 8,
        position: 'relative',
        marginRight: 17,
        display: 'flex',
        flexFlow: 'column nowrap',
        '&::before': {
            content: '""',
            position: 'absolute',
            width: 0,
            height: 0,
            left: -10,
            right: 'auto',
            top: 0,
            bottom: 'auto',
            border: '12px solid',
            borderColor: '#ffffff transparent transparent transparent',
        }
    },
    yourText: {
        color: '#0A0A0A',
        wordBreak: 'break-word',
    },
    yourTimeStamp: {
        alignSelf: 'flex-end',
        // color: '#fff',
        color: '#0A0A0A',
        fontSize: 9,
    },
    myChatBubble: {
        width: '100%',
        position: 'relative',
        display: 'flex',
        flexFlow: 'column nowrap',
        justifyContent: 'space-between',
        margin: '0 auto 20px',
        paddingLeft: 25,
    },
    myTextBody: {
        width: 'fit-content',
        maxWidth: '100%',
        backgroundColor: '#e153f9',
        textAlign: 'left',
        padding: 10,
        borderRadius: 8,
        position: 'relative',
        alignSelf: 'flex-end',
        '&::before': {
            content: '""',
            position: 'absolute',
            width: 0,
            height: 0,
            right: -8,
            top: 0,
            bottom: 'auto',
            border: '12px solid',
            borderColor: '#e153f9 transparent transparent transparent ',
        }
    },
    myText: {
        color: '#fff',
        wordBreak: 'break-word',
    },
    myTimeStamp: {
        color: '#fff',
        alignSelf: 'flex-end',
        fontSize: 9,
    },
    deliveryDetail: {
        position: 'relative',
        textAlign: 'right',
        paddingRight: 5,
    },
    sentIcon: {
        color: '#fff',
        width: 12,
        height: 12,
    },
    readIcon: {
        color: '#fff',
        width: 12,
        height: 12,
    },
    isTyping: {
        color: theme.palette.textColor.gray7,
        position: 'absolute',
        top: 'auto',
        left: 0,
        right: 0,
        bottom: 10,
        margin: 'auto',
        width: 110,
    },
    messagesBox: {
        paddingBottom: theme.spacing(4)
    },
    contactName:{
        display: 'flex',
        flexFlow: 'column nowrap',
        flexGrow: 1,
    }
}))


export default useStyles;