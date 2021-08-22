import React, { Component } from 'react';
import Form from './components/Form';
import ContactsList from './components/ContactsList';
import Filter from './components/Filter';
import Container from './components/Container';
import shortid from 'shortid';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  addContact = (name, number) => {
    const { contacts } = this.state;
    const contact = {
      name,
      number,
      id: shortid.generate(),
    };

    const normalizedText = name.toLowerCase();
    const doubledContact = contacts
      .map(contact => contact.name.toLowerCase())
      .includes(normalizedText);

    if (doubledContact) {
      alert(`${name} is already in contacts`);
    } else {
      this.setState(({ contacts }) => ({
        contacts: [contact, ...contacts],
      }));
    }
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  changeFilter = e => {
    this.setState({ filter: e.target.value });
  };

  getFilteredContacts = () => {
    const { filter, contacts } = this.state;

    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
  };

  render() {
    const { filter } = this.state;
    const filteredContacts = this.getFilteredContacts();

    return (
      <>
        <Container>
          <h1 className="title">Phonebook</h1>
        </Container>

        <Container>
          <Container>
            <Form onSubmit={this.addContact}></Form>
          </Container>

          <Container>
            <ContactsList
              onDeleteContact={this.deleteContact}
              contacts={filteredContacts}
            ></ContactsList>
          </Container>

          <Container>
            <Filter onChange={this.changeFilter} value={filter}></Filter>
          </Container>
        </Container>
      </>
    );
  }
}

export default App;
