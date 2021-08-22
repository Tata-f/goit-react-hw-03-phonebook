import React from 'react';
import PropTypes from 'prop-types';
import s from './ContactsList.module.css';

const ContactsList = ({ contacts, onDeleteContact }) => {
  return (
    <div className={s.contacts}>
      <h2 className={s.title}>Contacts</h2>
      <ul className={s.contactsList}>
        {contacts.map(({ id, name, number }) => (
          <li className={s.listItem} key={id}>
            <div className={s.contactInfo}>
              <p className={s.contactName}>{name}:</p>{' '}
              <p className={s.contactNumber}>{number}</p>
            </div>
            <button
              className={s.button}
              onClick={() => onDeleteContact(id)}
              type="button"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

ContactsList.propTypes = {
  onDeleteContact: PropTypes.func,
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }),
  ),
};

export default ContactsList;
