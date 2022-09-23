const Notification = ({ notification }) => {
  // console.log('notification', notification)
  if (notification !== null) {
    return <div className={notification.type}>{notification.message}</div>
  }
  // {
  //   notification !== null && ()
  //     <div className={notification.type}>{notification.message}</div>
  // }
  // return <div className={notification.type}>{notification.message}</div>
}

export default Notification
