import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Table from '../components/Table';
import WalletForm from '../components/WalletForm';
import '../styles/Wallet.css';

class Wallet extends React.Component {
  render() {
    return (
      <>
        <section className="header-content">
          <section className="header-walletForm">
            <Header />
            <WalletForm />
          </section>
        </section>
        <section className="table-content">
          <Table />
        </section>
      </>

    );
  }
}

export default connect()(Wallet);
