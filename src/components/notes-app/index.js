

import React, { Component } from "react";
import "./index.css";

export default class NotesApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      status: '',
      data: [],
      dataCopy: []
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSumbit = this.handleSumbit.bind(this); 
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(event) {
    event.preventDefault();
    let inputName = event.target.name,
      value = event.target.value;

    this.setState({[inputName]:value});
  }

  handleClick(event) {
    event.preventDefault();

    let liName = event.target.getAttribute('name'),
      temp = this.state.dataCopy,
      dataCopy = this.state.dataCopy;

      this.setState(() => {
        let alpha = [];

        for(let key of temp) {
          if(key.status === liName) alpha.push(key);
        }

        return {data: alpha.length ? alpha : dataCopy};
      });
  }

  handleSumbit() {
    let tempArr = this.state.data;
  
    let name = this.state.title,
      status = this.state.status;

    tempArr.push({name, status});

    this.setState({
      data: tempArr,
      title: '',
      status: '',
      dataCopy: tempArr
    });
  }

  render() {
    return (
      <div className="layout-column align-items-center justify-content-start">
        <section className="layout-row align-items-center justify-content-center mt-30">
          <input data-testid="input-note-name" name="title" type="text" className="large mx-8"
                placeholder="Note Title" onChange={this.handleChange} value={this.state.title}/>
          <input data-testid="input-note-status" name="status" type="text" className="large mx-8"
                placeholder="Note Status" onChange={this.handleChange} value={this.state.status}/>
          <button className="" data-testid="submit-button" onClick={this.handleSumbit}>Add Note</button>
        </section>

        <div className="mt-50">
          <ul className="tabs">
            <li className="tab-item slide-up-fade-in" data-testid="allButton" name="All" onClick={this.handleClick}>All</li>
            <li className="tab-item slide-up-fade-in" data-testid="activeButton" name="Active" onClick={this.handleClick}>Active</li>
            <li className="tab-item slide-up-fade-in" data-testid="completedButton" name="Completed" onClick={this.handleClick}>Completed</li>
          </ul>
        </div>
        <div className="card w-40 pt-30 pb-8">
          <table>
            <thead>
            <tr>
              <th>Title</th>
              <th>Status</th>
            </tr>
            </thead>
            <tbody data-testid="noteList" id="entry">
            {
              this.state.data ? this.state.data.map((key, index) => {
                return (
                  <tr key={index}>
                    <td>{key.name}</td>
                    <td>{key.status}</td>
                  </tr>
                )
              }) : ''
            }
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
