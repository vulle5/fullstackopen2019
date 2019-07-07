import React from 'react'
import { connect } from 'react-redux'

const BannerMessage = ({ banner }) => {
  if (banner.length === 0) {
    return null
  }

  return <div className={banner[0]}>{banner[1]}</div>
}
const mapStateToProps = state => {
  return {
    banner: state.banner
  }
}

export default connect(mapStateToProps)(BannerMessage)
