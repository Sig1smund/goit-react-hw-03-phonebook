import propTypes from 'prop-types';
import s from './contactList.module.css';

export default function ContactList({ children }) {
  const list = <ul className={s.list__block}>{children}</ul>;
  return list;
}

ContactList.propTypes = {
  children: propTypes.node,
};
