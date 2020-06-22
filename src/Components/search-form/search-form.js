import React from 'react';
import './search-form.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Select, MenuItem, InputLabel, Container, Button } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import { Row, Col } from 'react-bootstrap'
import StateInfoService from '../../http-call/stateinfo.service';
import SearchResult from '../search-result/search-result.js'



export default class SearchForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            localizationModules: [],
            languages: [],
            selectedModule: undefined,
            selectedLanguage: undefined,
            messages: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        StateInfoService.dropDownDetails()
            .then(response => {
                const stateInfo = response.data.MdmsRes['common-masters'].StateInfo[0];
                console.log(stateInfo);
                this.setState((prevState, props) => ({
                    localizationModules: stateInfo.localizationModules,
                    languages: stateInfo.languages,
                    selectedLanguage: "none",
                    selectedModule: "none"
                }));
            }).catch((error) => {
                console.log(error);
            });
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState((prevState) => ({
            ...prevState,
            [name]: value
        }));
        console.log(this.state)
    }

    handleClick() {
        console.log(this.state);
        const queryParams = 'module=' + this.state.selectedModule + '&locale=' + this.state.selectedLanguage;
        StateInfoService.search(queryParams).then((response) => {
            console.log(response);
            const messages = response.data.messages;
            console.log(this.state.messages)
            this.setState((prevState) => ({
                ...prevState,
                messages: messages
            }));
        })
    }

    render() {
        let show;
        if (this.state.messages.length > 0) {
            show = <SearchResult messages={this.state.messages}></SearchResult>
        }
        return (
            <div>
                <Container className="mt-5">
                    <Row >
                        <FormControl >
                            <Col>
                                <InputLabel id="demo-simple-select-label">Module</InputLabel>
                                <Select
                                    name="selectedModule"
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={this.state.selectedModule || "none"}
                                    onChange={this.handleChange}
                                >
                                    <MenuItem aria-label="NONE" value="none">----NONE---</MenuItem>
                                    {this.state.localizationModules.map((module, index) => (
                                        < MenuItem key={index} value={module.value} > {module.label}</MenuItem>
                                    ))}
                                </Select>
                            </Col>
                        </FormControl>
                        <FormControl>
                            <Col>
                                <InputLabel id="locale-label">Locale</InputLabel>
                                <Select
                                    name="selectedLanguage"
                                    labelId="locale-label"
                                    id="locale-select"
                                    value={this.state.selectedLanguage || "none"}
                                    onChange={this.handleChange}
                                >
                                    <MenuItem aria-label="NONE" value="none">----NONE---</MenuItem>
                                    {this.state.languages.map((language, index) => (
                                        < MenuItem key={index} value={language.value} > {language.label}</MenuItem>
                                    ))}
                                </Select>
                            </Col>
                        </FormControl>
                    </Row>
                    <Row>
                        <Col><br></br>
                            <Button variant="contained"
                                disabled={this.state.selectedLanguage === "none" || this.state.selectedModule === "none"}
                                onClick={this.handleClick} color="primary"> Submit</Button>
                        </Col>
                    </Row>
                </Container>
                <Container className="mt-5">
                    {show}
                </Container>
            </div >
        );
    }
}