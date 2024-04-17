import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import './App.css'

const colorList = ['yellow', 'green', 'orange', 'brown', 'blue']

class App extends Component {
  state = {
    isTrue: false,
    latestList: [],
    website: '',
    username: '',
    password: '',
    isShow: false,
  }

  listenWebsite = e => {
    this.setState({website: e.target.value})
  }

  listenUsername = e => {
    this.setState({username: e.target.value})
  }

  listenPassword = e => {
    this.setState({password: e.target.value})
  }

  addCountent = e => {
    e.preventDefault()
    const {username, website, password} = this.state
    const initial = website.slice(0, 1).toUpperCase()
    const classValue = colorList[Math.floor(Math.random() * 5)]
    const newValues = {
      id: uuidv4(),
      initialValue: initial,
      websiteName: website,
      userName: username,
      Password: password,
      classAdd: classValue,
    }
    this.setState(prevState => ({
      latestList: [...prevState.latestList, newValues],
      website: '',
      username: '',
      password: '',
      isTrue: true,
      searchInput: '',
    }))
  }

  showPassword = e => {
    if (e.target.checked) {
      this.setState({isShow: true})
    } else {
      this.setState({isShow: false})
    }
  }

  searchList = e => {
    this.setState({searchInput: e.target.value})
  }

  deleteItem = id => {
    const {latestList} = this.state
    const newList = latestList.filter(eachValue => eachValue.id !== id)
    const caseOf = newList.length !== 0
    this.setState({latestList: newList, isTrue: caseOf})
  }

  render() {
    const {website, username, password, latestList, isShow, searchInput} =
      this.state
    let {isTrue} = this.state
    const newList = latestList.filter(eachValue =>
      eachValue.websiteName.toLowerCase().includes(searchInput.toLowerCase()),
    )

    if (newList.length === 0) {
      isTrue = false
    } else {
      isTrue = true
    }

    return (
      <div className="container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="app-logo"
        />

        <div className="sub-div1">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
            className="image2"
            alt="password manager"
          />
          <form className="add" onSubmit={this.addCount}>
            <h1 className="head">Add New Password</h1>
            <div className="input-hol">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                className="input-img"
                alt="website"
              />

              <input
                type="text"
                className="in-ele"
                placeholder="Enter Website"
                onChange={this.listenWebsite}
                value={website}
              />
            </div>

            <div className="input-hol">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                className="input-img"
                alt="username"
              />
              <input
                type="text"
                className="in-ele"
                placeholder="Enter Username"
                onChange={this.listenUsername}
                value={username}
              />
            </div>

            <div className="input-hol">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                className="input-img"
                alt="password"
              />
              <input
                type="password"
                className="in-ele"
                placeholder="Enter Password"
                onChange={this.listenPassword}
                value={password}
              />
            </div>

            <button type="submit" className="add-btn">
              Add
            </button>
          </form>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            className="sub-div1-img1"
            alt="password manager"
          />
        </div>
        <div className="sub-div2">
          <div className="first">
            <div className="your">
              <h1 className="head-na">Your Passwords</h1>
              <p className="text">{newList.length}</p>
            </div>
            <div className="search-hol">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                className="input-img"
                alt="search"
              />
              <input
                type="search"
                className="in-ele"
                placeholder="Search"
                onChange={this.searchList}
                value={searchInput}
              />
            </div>
          </div>
          <hr />
          <div className="show-pass">
            <input
              type="checkbox"
              className="check-box"
              id="check"
              onChange={this.showPassword}
            />
            <label htmlFor="check" className="label-pass">
              Show Passwords
            </label>
          </div>
          {!isTrue && (
            <div className="empty-state">
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                className="empty-img"
                alt="no passwords"
              />
              <p className="no-pass">No Passwords</p>
            </div>
          )}
          {isTrue && (
            <ul className="res-cont">
              {newList.map(eachValue => (
                <li className="item-li" id={eachValue.id} key={eachValue.id}>
                  <p className={`initial ${eachValue.classAdd}`}>
                    {eachValue.initialValue}
                  </p>
                  <div className="list-content">
                    <p className="web">{eachValue.websiteName}</p>
                    <p className="web">{eachValue.userName}</p>
                    {!isShow && (
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                        className="start-img"
                        alt="stars"
                      />
                    )}
                    {isShow && <p className="web">{eachValue.Password}</p>}
                  </div>
                  <button
                    type="button"
                    className="del-btn"
                    onClick={() => this.deleteItem(eachValue.id)}
                    data-testid="delete"
                  >
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
                      className="del-img"
                      alt="delete"
                    />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default App
