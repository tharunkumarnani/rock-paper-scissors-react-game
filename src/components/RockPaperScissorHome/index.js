/* eslint-disable jsx-a11y/media-has-caption */
import {Component} from 'react'
import Popup from 'reactjs-popup'
import {RiCloseLine} from 'react-icons/ri'
import './index.css'

class RockPaperScissorHome extends Component {
  state = {
    gameStatus: '',
    score: 0,
    selectedItem: false,
    selectedItemUrl: '',
    opponentUrl: '',
  }

  selectTheChoice = choiceId => {
    const {choicesList} = this.props
    let randomIndi = Math.floor((Math.random() * 10) / 3)
    randomIndi = randomIndi > 2 ? 1 : randomIndi
    const yourSelectedChoice = choicesList.filter(each => each.id === choiceId)
    const myChoice = yourSelectedChoice[0].id
    const myChoiceUrl = yourSelectedChoice[0].imageUrl
    const opponentRandom = choicesList[randomIndi]
    if (myChoice === 'PAPER') {
      if (opponentRandom.id === 'ROCK') {
        this.setState(prevState => ({
          score: prevState.score + 1,
          gameStatus: 'YOU WON',
          selectedItem: true,
          selectedItemUrl: myChoiceUrl,
          opponentUrl: opponentRandom.imageUrl,
        }))
      } else if (opponentRandom.id === 'SCISSORS') {
        this.setState(prevState => ({
          score: prevState.score - 1,
          gameStatus: 'YOU LOSE',
          selectedItem: true,
          selectedItemUrl: myChoiceUrl,
          opponentUrl: opponentRandom.imageUrl,
        }))
      } else {
        this.setState({
          gameStatus: 'IT IS DRAW',
          selectedItem: true,
          selectedItemUrl: myChoiceUrl,
          opponentUrl: opponentRandom.imageUrl,
        })
      }
    } else if (myChoice === 'ROCK') {
      if (opponentRandom.id === 'SCISSORS') {
        this.setState(prevState => ({
          score: prevState.score + 1,
          gameStatus: 'YOU WON',
          selectedItem: true,
          selectedItemUrl: myChoiceUrl,
          opponentUrl: opponentRandom.imageUrl,
        }))
      } else if (opponentRandom.id === 'PAPER') {
        this.setState(prevState => ({
          score: prevState.score - 1,
          gameStatus: 'YOU LOSE',
          selectedItem: true,
          selectedItemUrl: myChoiceUrl,
          opponentUrl: opponentRandom.imageUrl,
        }))
      } else {
        this.setState({
          gameStatus: 'IT IS DRAW',
          selectedItem: true,
          selectedItemUrl: myChoice.imageUrl,
          opponentUrl: opponentRandom.imageUrl,
        })
      }
    } else if (myChoice === 'SCISSORS') {
      if (opponentRandom.id === 'PAPER') {
        this.setState(prevState => ({
          score: prevState.score + 1,
          gameStatus: 'YOU WON',
          selectedItem: true,
          selectedItemUrl: myChoiceUrl,
          opponentUrl: opponentRandom.imageUrl,
        }))
      } else if (opponentRandom.id === 'ROCK') {
        this.setState(prevState => ({
          score: prevState.score - 1,
          gameStatus: 'YOU LOSE',
          selectedItem: true,
          selectedItemUrl: myChoiceUrl,
          opponentUrl: opponentRandom.imageUrl,
        }))
      } else {
        this.setState({
          gameStatus: 'IT IS DRAW',
          selectedItem: true,
          selectedItemUrl: myChoiceUrl,
          opponentUrl: opponentRandom.imageUrl,
        })
      }
    }
  }

  entryLevel = () => {
    const {choicesList} = this.props

    return (
      <ul className="images-cont">
        {choicesList.map(each => {
          const {id, imageUrl, btnTest} = each
          const requestToSelect = () => {
            this.selectTheChoice(id)
          }
          return (
            <li className="each-choice" key={id}>
              <button
                data-testid={btnTest}
                className="choice-btn"
                type="button"
                onClick={requestToSelect}
              >
                <img className="choice-img" src={imageUrl} alt={id} />
              </button>
            </li>
          )
        })}
      </ul>
    )
  }

  playAgainRequest = () => {
    this.setState({selectedItem: false})
  }

  winOrLose = () => {
    const {selectedItemUrl, opponentUrl, gameStatus} = this.state
    const playAudioWin = gameStatus === 'YOU WON'
    const playLoseDraw =
      gameStatus === 'YOU LOSE' || gameStatus === 'IT IS DRAW'
    return (
      <div className="win-lose-play-again">
        <div className="win-lose-dis">
          <div className="yours-cont">
            <h1 className="who-player">You</h1>
            <img
              className="choice-img"
              src={selectedItemUrl}
              alt="your choice"
            />
          </div>

          <div className="opponent">
            <h1 className="who-player">Opponent</h1>
            <img
              className="choice-img"
              src={opponentUrl}
              alt="opponent choice"
            />
          </div>
        </div>
        <p className="win-lose">{gameStatus}</p>

        {playAudioWin && (
          <audio autoPlay>
            <source
              src="https://assetscdn-wchat.in.freshchat.com/static/assets/notif.da662fefc5060dabf2859ea199198b14.mp3"
              type="audio/mpeg"
            />
          </audio>
        )}
        {playLoseDraw && (
          <audio autoPlay>
            <source
              src="https://res.cloudinary.com/dcbox8yto/video/upload/v1697697347/Mario_lose_sound_effect__HD_128k_xyjwsq.mp3"
              type="audio/mpeg"
            />
          </audio>
        )}
        <button
          className="play-again"
          type="button"
          onClick={this.playAgainRequest}
        >
          Play Again
        </button>
      </div>
    )
  }

  render() {
    const {score, selectedItem} = this.state
    const overLayStyles = {
      backgroundColor: '#ffff',
      height: '60%',
    }
    return (
      <div className="home-cont">
        <div className="names-score">
          <div className="names-cont">
            <h1 className="names-style">Rock Paper Scissors</h1>
          </div>
          <div className="score-display">
            <p className="score">Score</p>
            <p className="score-count">{score}</p>
          </div>
        </div>
        {selectedItem ? this.winOrLose() : this.entryLevel()}
        <div className="rules-cont">
          <Popup
            modal
            trigger={
              <button className="rules-btn" type="button">
                Rules
              </button>
            }
            overlaStyle={overLayStyles}
          >
            {close => (
              <div className="img-cont">
                <button
                  className="close-btn"
                  type="button"
                  onClick={() => close()}
                >
                  <RiCloseLine className="icon-style" />
                </button>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rules-image.png"
                  alt="rules"
                  className="rules-img"
                />
              </div>
            )}
          </Popup>
        </div>
      </div>
    )
  }
}

export default RockPaperScissorHome
