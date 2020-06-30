import React from "react";
import './Shop.css'
import Product from "./Product";
import {products,types} from "./products";

class Shop  extends React.Component{
  componentDidMount(){
    this.setState({products:products})
  }

  state={
    products:[],
    searchField:"",
    allCheck:false,
    keychainsCheck:false,
    babiesCheck:false,
    couplesCheck:false,
    earingsCheck:false,
  }
  filterProducts =()=>{
    //check the search field
    let filteredProducts=products.filter((item)=>{
      return item.name.toLowerCase().trim().includes(this.state.searchField.toLowerCase().trim());
    })

    if(!this.state.keychainsCheck&&!this.state.babiesCheck&&!this.state.couplesCheck&&!this.state.earingsCheck)
    {
      this.setState({products:filteredProducts})
    }else
    {
      let partialFiltered;
      let filteredKeychains=[],filteredBabies=[],filteredCouples=[],filteredEarings=[];
      //check the type
      partialFiltered=[...filteredProducts];
      if(this.state.keychainsCheck) filteredKeychains=partialFiltered.filter(item=> item.type.includes(types.keychains))
      partialFiltered=[...filteredProducts];
      if(this.state.babiesCheck) filteredBabies=partialFiltered.filter(item=> item.type.includes(types.babies))
      partialFiltered=[...filteredProducts];
      if(this.state.couplesCheck) filteredCouples=partialFiltered.filter(item=> item.type.includes(types.Couples))
      partialFiltered=[...filteredProducts];
      if(this.state.earingsCheck) filteredEarings=partialFiltered.filter(item=> item.type.includes(types.Earings))
  
  
      const finalFiltered=filteredKeychains.concat(filteredBabies,filteredCouples,filteredEarings);
      //filter the page
      this.setState({products:finalFiltered})

    }



  }

  render(){
    return(
      <div className="shop-class" >
      <input className="search-bar" type="text" value={this.state.searchField} placeholder=" Search" onChange={(e)=>{
        this.setState({searchField:e.target.value},()=>{
          this.filterProducts();
        })
        
        
      }}></input>

        {/* <input type="checkbox" id="all" name="All" value="all"/>
        <label for="vehicle1"> I have a bike</label><br></br>
        <input type="checkbox" id="all" name="All" value="all"/> */}
        <div className="category-filters">

        {/* <input onChange={(e)=>{

          this.setState({allCheck:e.target.checked},()=>{
            this.filterProducts();
          })
        }} checked={this.state.allCheck} className="category-filter" type="checkbox" id="all" name="all" value="all"/>
        <label for="all"> All  </label> */}

        <input onChange={(e)=>{
        this.setState({keychainsCheck:e.target.checked},()=>{
          this.filterProducts();
        })
        }} checked={this.state.keychainsCheck} className="category-filter" type="checkbox" id="keychains" name="keychains" value="keychains"/>
        <label for="keychains"> Keychains  </label>

        <input onChange={(e)=>{
          this.setState({babiesCheck:e.target.checked},()=>{
            this.filterProducts();
          })
        }} checked={this.state.babiesCheck} className="category-filter" type="checkbox" id="babies" name="babies" value="babies"/>
        <label for="babies"> Babies  </label>

        <input onChange={(e)=>{
          this.setState({couplesCheck:e.target.checked},()=>{
            this.filterProducts();
          })
        }} checked={this.state.couplesCheck} className="category-filter" type="checkbox" id="couples" name="couples" value="couples"/>
        <label for="couples"> Couples  </label>

        <input onChange={(e)=>{
          this.setState({earingsCheck:e.target.checked},()=>{
            this.filterProducts();
          })
        }} checked={this.state.earingsCheck} className="category-filter" type="checkbox" id="earings" name="earings" value="earings"/>
        <label for="earings"> Earings  </label>


        </div>
        
        <div className="product-category container-fluid">
        
        {this.state.products.map((item,index)=>(
        <Product name={item.name}
        image={item.image}
        size={item.size}
        status={item.status}
        price={item.price}
        key={index}/>
        ))}
        </div>


        
      </div>
      )
  
  }
  
}

export default Shop;