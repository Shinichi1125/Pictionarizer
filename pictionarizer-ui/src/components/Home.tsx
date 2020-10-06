import React from 'react';
import Words from './Words';
import SearchAndRecommendation from './SearchAndRecommendation';
import Footer from './Footer';

class Home extends React.Component{
  render(){
    return(
      <div className="flex">
        <main>
          <Words/>
        </main>
        <aside>
          <SearchAndRecommendation/>
          <Footer/>
        </aside>
      </div>
      
    )
  }
}

export default Home; 