import React, { Component } from 'react';
import './App.css';

import IconexConnect from './IconexConnect';
import {
  IconConverter
} from 'icon-sdk-js'
import SDK from './SDK.js';

import date1 from "../src/assets/images/유머2.jpeg"
import date2 from "../src/assets/images/유머3.jpeg"
import date3 from "../src/assets/images/유머4.jpeg"
import date4 from "../src/assets/images/유머5.jpg"
import date5 from "../src/assets/images/유머6.png"


function randomImg(hex) {
  return parseInt(hex[hex.length - 1], 16) % 7;
}

const DATEURL = [
  date1,
  date2,
  date3,
  date4,
  date5,

]

const DATESTR = [
  "< 서울 스카이 >",
  "< 잠실 자동차 극장 >",
  "< 1890 남산골 야시장 >",
  "< 남산골 한옥마을 >",
  "< 응봉산 전망대 >",
  "< 동대문 디자인 플라자 >",
  "< 동대문 메가박스 무비 올나잇 >",
]

export default class App extends Component {
  state = {
    login: false,
    dateurl: DATEURL[0],
    myAddress: '',
    datestr: DATESTR[0]
  }

  click = async (e) => {
    const myAddress = await IconexConnect.getAddress()
    this.setState({
      login: true,
      myAddress: myAddress
    })
  }

  getDatePlace = async () => {
    const { sendTxBuild2 } = SDK
    const txObj = sendTxBuild2({
      from: this.state.myAddress,
      to: window.CONTRACT_ADDRESS,
    })

    const tx = await IconexConnect.sendTransaction(txObj)

    console.log(randomImg(tx), this.state.dateurl)
    if (tx) {
      console.log(1234)
      this.setState({
        dateurl: DATEURL[randomImg(tx)],
        datestr: DATESTR[randomImg(tx)]
      })
    }
    
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1><a href="/"></a></h1>
          {
            !this.state.login ? (
              <>
                {/* <div className="wrap2" onClick={this.click}  style={{ backgroundImage: `url(${this.state.dateurl})` }}></div> */}
                <div className="wrap" onClick={this.click}>
                  <a href="#" className="button2" >유머저장소</a>
                 
                </div>
              </>
            ) : (
                <>
                   <h2>다음 짤을 보려면 아래 그림 클릭!</h2>
                  <div className="wrap" onClick={this.getDatePlace}  style={{ backgroundImage: `url(${this.state.dateurl})`, width: "100%" ,height:"300px"}}>
                  <a></a>
                  </div>
                </>
              )
          }
        </header>
      </div>
    );
  }

}



