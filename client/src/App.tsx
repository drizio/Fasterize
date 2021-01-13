import React, {useState} from "react";
import { Row, Col  } from "antd";
import FormUrl from "./components/Form";
import History from "./components/History";
import SectionTitle from './components/SectionTitle';

function App() {
  const [url, setUrl] = useState("")
  const onSubmit = async (url: string) => {
    /*try {
      const response = await fetch("http://localhost:3000/?url=" + url);
      const json = await response.json();
      console.log(json);
    } catch (error) {
      console.log(error);
    }*/
    setUrl(url)
  };

  return (
    <Row className="full-heigth">
      <Col span={6} className="sidebar">
        <a href="##">
          <img
            alt="Fasterize_logo_mini"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAhCAMAAABDYWOIAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAABFUExURUxpcf///////////////////////////////////////////////////////////////////////////////////////4aDdakAAAAWdFJOUwBcrcIHE+D69IZ2IuxoRIHWlucwzaEkttZiAAABG0lEQVQ4y5VVURaDIAxDEQEVRJ3c/6hDNvawtMj6o68aY5u0MAZilV6u103vUyyO64NVYg8v7eE6+3uM00BiEJ6E6lhbdDnqHNpASw7i4m+eAIJMk/SPsQHM6Buia+GRm41VfJs/En3ICccZVGZQiM0ge4L89HIoJlczfVWsv9TMtNIhZRResQp/L5Z7bmLKq4B5EV3qS4lCrs4zhWcnyL0o/QWPzy0i206axkRtvmLcBkPWeTjmusijSZ9ppPufehRpLgu1Sb2s8IhSnU8vaR84YKTkg5rfrmHZIMTVfR1m5SiKNfXpmYUpqrnNj/P+7zlt2QblPgBxLCWEP224voQ87beSh9qjcZ4GjpRC7+s4txZBVM4FhAeeP29QZUpZRrpJ6wAAAABJRU5ErkJggg=="
            className="logo"
          />
          <span className="logo-text">Fasterize</span>
        </a>
      </Col>
      <Col span={18} className="content">
        <h4 className="title">fasterize debugger</h4>
        <br />
        
        <FormUrl onSubmit={onSubmit} />
        <br />
        <SectionTitle title="history" />
        <br />
        <History url={url}/>
      </Col>
    </Row>
  );
}

export default App;
