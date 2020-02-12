import React from 'react';
import {Link } from 'react-router-dom'
import './navbar.css'
import {connect} from 'react-redux'
import {setLoading,unsetLoading} from '../../store/actions/loading-indicator.actions'

class Navbar extends React.Component {

    handleLogout=()=>{
        localStorage.clear();
        window.location.reload(true);
      }

      handleRefresh=()=>{
          this.props.setLoading();
          //@TO-DO: refresh , unsetloading when req is returned
            setTimeout(() => {
                this.props.unsetLoading();
            }, 2000);
      }

      handleGenerate=()=>{
            //@TO-DO: generate 
      }

    render(){
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <p className="betting">Betting
                {
                    this.props.current_user?
                    this.props.current_user.credit.$numberDecimal!==undefined?
                    <span style={{"fontSize":"15px","marginLeft":"10px"}}>
                        Credit : {this.props.current_user.credit.$numberDecimal} rsd
                    </span>
                    :
                    null
                    :
                    null
                }
                </p>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                </ul>
                    {
                    !localStorage.getItem("user_id")?
                    <li className="nav-link ">
                        <Link to="/login" className='myLink'>
                            Login
                        </Link>
                    </li>
                    :
                    null
                    }
                    {
                    !localStorage.getItem("user_id")?
                    <li className="nav-link">
                        <Link to="/register" className='myLink'>
                            Register
                        </Link>
                    </li>
                    :
                    null
                    }
                    <button 
                    disabled={this.props.loading}
                    onClick={this.handleGenerate} 
                    className="btn btn-primary  my-2 my-lg-0 otherBtn">
                                Generate
                                <i className='fa fa-upload refreshIcon'></i>
                    </button>
                    <button 
                    disabled={this.props.loading}
                    onClick={this.handleRefresh} 
                    className="btn btn-primary  my-2 my-lg-0 otherBtn">
                                Refresh
                                {
                                    this.props.loading===false?
                                    <i className='fa fa-refresh refreshIcon faa-flash animated'></i>
                                    :
                                    <i className='fa fa-refresh refreshIcon fa-spin'></i>
                                }
                    </button>
                    {
                    localStorage.getItem("user_id")?
                    <div onClick={this.handleLogout} className="btn btn-primary  my-2 my-lg-0 logoutBtn">
                                Logout
                    </div>
                    :
                    null
                    }
                </div>
          </nav>
        )
    }
}

function mapStateToProps(state){
    return {
        current_user:state.current_user,
        loading:state.loading_indicator
    }
  }

  function mapDispatchToProps(dispatch){
    return{
        setLoading: () => (dispatch(setLoading())),
        unsetLoading: () => (dispatch(unsetLoading()))
    }
  }
  
  
  export default connect(mapStateToProps,mapDispatchToProps)(Navbar);