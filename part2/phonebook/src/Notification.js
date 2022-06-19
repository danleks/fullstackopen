const Notification = ({message}) => {
    if (message.type === null) {
        return null;
    }

    return (
        <div style={{color: `${message.type === 'success' ? 'green' : 'red'}`}}>
            {message.message}
        </div>
    );
};

export default Notification;