import React, { Component } from "react";
import {isEqual} from 'lodash'
import ContactForm from "./contactForm";
import Filter from "./filter";
import ContactList from "./contactList";
import ContactsItem from "./contactItem";
import s from './contactForm/contactForm.module.css'

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  }

  eraseContact = (elem) => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.name !== elem),
    }));
  }

  accumulateContacts = (data) => {
    const test = this.state.contacts.some((user) => isEqual(data, user));
    !test ? this.setState(prevState => ({
      contacts: [data, ...prevState.contacts],
    })) : alert(`${data.name} is already in contacts!` )
  }

  handleFilteredItems = (e) => {
    this.setState({filter: e.currentTarget.value})
  }

  filteredItems = () => {
    const { filter, contacts } = this.state;
    const loweredFilter = filter.toLowerCase();
    
    return contacts.filter(elem => elem.name.toLowerCase().includes(loweredFilter));

  }

  componentDidMount() {
    const rawData = localStorage.getItem('contacts');
    const parsedData = JSON.parse(rawData);

    if (parsedData) {
      this.setState({ contacts: parsedData });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts))
    }
  }

  render() {

    return (
      <div className={s.container}>
        <h2>Phonebook</h2>
        <ContactForm data={this.accumulateContacts} />
        <h2>Contacts</h2>
        <Filter eventHandler={this.handleFilteredItems} options={this.state.filter}/>
        <ContactList>
          <ContactsItem erase={this.eraseContact} filtered={this.filteredItems}/>
        </ContactList>
      </div>
    )
  }
}

export default App;