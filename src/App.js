import React, { Component } from 'react';
import './App.css';
import {Nav, Navbar, NavItem, Panel, ButtonToolbar, Button } from 'react-bootstrap';
import fs from 'fs';
import path from 'path';
import photosZip from './Photos.zip';
import {remote} from 'electron';
import AdmZip from 'adm-zip';

class App extends Component {
  render() {
    return (
      <div>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#">Sample-App</a>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav>
            <NavItem eventKey={1} href="#">Link</NavItem>
            <NavItem eventKey={2} href="#">Link</NavItem>
          </Nav>
        </Navbar>
        <Panel>
          <ButtonToolbar>
            <Button bsStyle="primary" bsSize="small" onClick={this.extract}>
              Extract
            </Button>
            <Button bsStyle="info" bsSize="small" onClick={this.selectFile}>
              Select File
            </Button>
          </ButtonToolbar>
        </Panel>
      </div>
    );
  }

  selectFile() {
    let dialog = remote.dialog;
    dialog.showOpenDialog((fileNames) => {
      if(fileNames === undefined){
        console.log("No file selected");
      }else{
        console.log("File Opened: " + fileNames[0]);
        fs.createReadStream(fileNames[0]).pipe(fs.createWriteStream('./data/' + path.win32.basename(fileNames[0])));
        console.log("File copied");
      }
    })
  }

  extract() {
    let photos = new AdmZip(photosZip)
    photos.extractAllToAsync('./data', true, () => {
      console.log('successfully extracted');
    })
  }
}

export default App;
