'use strict'

import React, {Component} from 'react'
import {connect} from 'react-redux'
import { deleteLineitemServer, updateLineitemServer } from '../store/order'
import { Segment, Image, Header, Form, Input, Button } from 'semantic-ui-react'

class LineItem extends Component {
  constructor() {
    super()
    this.state = {
      quantity: 0
    }
  }

  async componentDidMount() {
    const quant = this.props.lineItem.quantity
    await this.setState({
      quantity: quant
    })
  }

  handleChange = (event) => {
    if (typeof event.target.value !== 'number') {
      this.setState({ quantity: 0 })
    }
    this.setState({
      quantity: +event.target.value
    })
  }

  handleUpdate = async (event) => {
    // Call thunk to update lineitem (quantity)
    event.preventDefault()
    if (this.state.quantity === 0) {
      await this.props.deleteItem(this.props.lineItem.id)
    } else {
      await this.props.updateItem(this.props.lineItem.id, this.state.quantity)
    }
  }

  handleDelete = async (event) => {
    // Call thunk to delete lineitem
    event.preventDefault()
    await this.props.deleteItem(this.props.lineItem.id)
  }

  render() {
    const lineItem = this.props.lineItem
    const product = lineItem.product

    return (
      <Segment padded>
        <div
          className='line-item-img-bound'
        >
          <Image
            src={product.imgUrl}
            size='tiny'
          />
        </div>
        <Header
          as='h3'
          style={{ marginTop: '0', marginBottom: '0.25rem', paddingTop: '0' }}
        >
          {product.name}
        </Header>
        <p>{product.description}</p>
      </Segment>
    )
  // }
  //   return (
  //     <div className="line-item-container container">
  //       <div className="line-item-img-bound container">
  //         <img src={product.imgUrl} />
  //       </div>
  //       <div className="line-item-name-description">
  //         <h4>{product.name}</h4>
  //         <p>{product.description}</p>
  //       </div>
  //       <p>Price: ${product.price}</p>
  //       <form onChange={this.handleChange}>
  //         Quantity:
  //         <input
  //           name="quantity-input"
  //           className="form-control"
  //           type="text"
  //           value={this.state.quantity}
  //         />
  //         <button onClick={this.handleUpdate}>Update</button>
  //         <button onClick={this.handleDelete}>Delete</button>
  //       </form>
  //     </div>
  //   )
  }
}

const mapDispatch = (dispatch) => {
  return {
    deleteItem: (id) => dispatch(deleteLineitemServer(id)),
    updateItem: (id, quantity) => dispatch(updateLineitemServer(id, quantity))
  }
}

export default connect(null, mapDispatch)(LineItem)

