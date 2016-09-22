import React from 'react';
import styles from './App.css';
import AppBar from 'material-ui/lib/app-bar';
import AppCanvas from 'material-ui/lib/app-canvas';
import LeftNav from 'material-ui/lib/left-nav';
import ToolBar from 'material-ui/lib/toolbar/toolbar';
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group';
import ToolbarSeparator from 'material-ui/lib/toolbar/toolbar-separator';
import ToolbarTitle from 'material-ui/lib/toolbar/toolbar-title';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import {SelectableContainerEnhance} from 'material-ui/lib/hoc/selectable-enhance';
const SelectableList = SelectableContainerEnhance(List);
import IconButton from 'material-ui/lib/icon-button';
import NavigationMoreVert from 'material-ui/lib/svg-icons/navigation/more-vert';
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme';
import ActiveTheme from '../mui-themes/active-theme.js';
import LeftMenu from './components/LeftMenu';
import auth from './auth';
import TextField from 'material-ui/lib/text-field';

 
import AppActionCreators from './actions/AppActionCreators'; 
import AuthStore from './stores/AuthStore';

import {
 SearchBox,
  Hits,
  HitsStats,
  RefinementListFilter,
  Pagination,
  ResetFilters,
  MenuFilter,
  SelectedFilters,
  HierarchicalMenuFilter,
  NumericRefinementListFilter,
  SortingSelector,
  SearchkitComponent,
  SearchkitProvider,
  SearchkitManager,
  NoHits,
  RangeFilter,
  InitialLoader,
  ViewSwitcherToggle,
  ViewSwitcherHits,
  Layout, LayoutBody, LayoutResults,
  SideBar, TopBar,
  ActionBar, ActionBarRow
    } from "searchkit"; 

var FACEBOOK_CHANGE_EVENT = 'FACEBOOK_CHANGE_EVENT';
import {MovieHitsGridItem, MovieHitsListItem} from "./ResultComponents"
import AppBar_Auth from './components/AppBar_Auth';
export default class App extends React.Component {
    constructor( props )
    {
      super( props );
      
       const host = "http://demo.searchkit.co/api/movies/"
    this.searchkit = new SearchkitManager(host)
    this.searchkit.translateFunction = (key)=> {
      return {"pagination.next":"Sonraki", "pagination.previous":"Önceki"}[key]
    }
      this.state = {
        loggedIn: AuthStore.loggedIn,
        token : AuthStore.token
      }
      
      this._onAuthChange = this._onAuthChange.bind(this);
    }
    componentWillMount() {
        document.title = "MyApp | Start"; 
    }; 

  //the key passed through context must be called "muiTheme"
 

  getChildContext() {
    return {
      muiTheme: ThemeManager.getMuiTheme(ActiveTheme),
    };
  } 


    getAuthState(){
        return {
            loggedIn: AuthStore.loggedIn,
            token : AuthStore.token
        } 
    }
 
    componentDidMount() {
        //console.log(this.getChildContext());
        //sayfa yüklenirken tüm bilgileri getir!! login gibi 
        //AppActionCreators.initUserDatas();
        
        AuthStore.addChangeListener(this._onAuthChange);
    }

    componentWillUnmount() {
        AuthStore.removeChangeListener(this._onAuthChange);
    }

    _onAuthChange() {  
      this.setState(this.getAuthState()); 
    }
    
    _handle_onTouchTap_NavigationToggle = ( ) =>
    {  
        this.refs['leftMenu']._handle_onTouchTap_NavigationToggle(); 
    }

  render() {  
      var IsAnonymous = !this.state.loggedIn; 
      var isUser = false;
      var User = { User_DisplayName: "testUser", User_ProfilePhoto: "http://media4.popsugar-assets.com/files/2014/08/08/878/n/1922507/caef16ec354ca23b_thumb_temp_cover_file32304521407524949.xxxlarge/i/Funny-Cat-GIFs.jpg"};
      var Interviewer = { Interviewer_DisplayName: "testInterviewer", Interviewer_ProfilePhoto: "http://media4.popsugar-assets.com/files/2014/08/08/878/n/1922507/caef16ec354ca23b_thumb_temp_cover_file32304521407524949.xxxlarge/i/Funny-Cat-GIFs.jpg"};
      var menu = (<SideBar>
                          <HierarchicalMenuFilter fields={["type.raw", "genres.raw"]} title="Categories" id="categories"/> 
                          <RefinementListFilter id="actors" title="Actors" field="actors.raw" size={10}/>
                                            <RefinementListFilter translations={{"facets.view_more":"View more writers"}} id="writers" title="Writers" field="writers.raw" operator="OR" size={10}/>
                                            <RefinementListFilter id="countries" title="Countries" field="countries.raw" operator="OR" size={10}/>
                          <NumericRefinementListFilter id="runtimeMinutes" title="Length" field="runtimeMinutes" options={[
                            {title:"All"},
                            {title:"up to 20", from:0, to:20},
                            {title:"21 to 60", from:21, to:60},
                            {title:"60 or more", from:61, to:1000}
                          ]}/>
                        </SideBar>);
              
            
    return (
       	<AppCanvas> 
            <SearchkitProvider searchkit={this.searchkit}>
                <Layout size="l">
                    <ToolBar
                        style={ {
                         top: 0,
                          zIndex: 5,
                          position: 'fixed', 
                          backgroundColor: ActiveTheme.palette.accent2Color
                        }}
                    > 
                        <ToolbarGroup float="left" style={{width:'237'}}>
                          <ToolbarTitle text="MyApp" style={{width: '100%', color: ActiveTheme.palette.alternateTextColor}} />
                        </ToolbarGroup>
                        <ToolbarGroup    style={{width:'calc(100% - 310px)'}} >
                            <div className={'col-xs-12'} style={{padding:6}}>  
                                <SearchBox
                                  translations={{"searchbox.placeholder":"search movies"}} 
                                  autofocus={true}
                                  searchOnChange={true}
                                  queryFields={["actors^1","type^2","languages","title^5", "genres^2", "plot"]}/> 
                            </div>
                        </ToolbarGroup>
                        <ToolbarGroup float="right"  >
                            <ToolbarSeparator /> 
                               <AppBar_Auth location= {this.props.location} IsAnonymous={IsAnonymous} isUser={isUser} Interviewer={Interviewer} User = {User} /> 
                       </ToolbarGroup>
                    </ToolBar> 
                    <LayoutBody>
                        <LeftMenu ref= {'leftMenu'} searchMenu= {menu} open={true} docked={true} IsAnonymous={IsAnonymous} isUser={isUser} Interviewer={Interviewer} User = {User}/> 
                 
                        <LayoutResults style={{left:200}}>
                          
                           <ActionBar>
                               <ActionBarRow>
                                   <HitsStats translations={{
                                           "hitstats.results_found":"{hitCount} sonuç bulundu"
                                         }}/>
                                   <ViewSwitcherToggle/>
                                     <SortingSelector options={[
                                             {label:"Relevance", field:"_score", order:"desc",defaultOption:true},
                                             {label:"Latest Releases", field:"released", order:"desc"},
                                             {label:"Earliest Releases", field:"released", order:"asc"}
                                     ]}/>
                               </ActionBarRow>
                               <ActionBarRow>
                                 <SelectedFilters/>
                                 <ResetFilters/>
                               </ActionBarRow>

                           </ActionBar>

                           <ViewSwitcherHits
                                                 hitsPerPage={12} highlightFields={["title","plot"]}
                               sourceFilter={["plot", "title", "poster", "imdbId", "imdbRating", "year"]}
                               hitComponents = {[
                                 {key:"grid", title:"Grid", itemComponent:MovieHitsGridItem, defaultOption:true},
                                 {key:"list", title:"List", itemComponent:MovieHitsListItem}
                               ]}
                               scrollTo="body"
                           /> 
                           <NoHits suggestionsField={"title"}/>
                           <InitialLoader/>
                           <Pagination showNumbers={true}/> 
                           
                           <div className={'col-flex-1'} style={ {paddingRight: 5 } }>
                                {this.props.children}  
                           </div>
                        </LayoutResults>
                    </LayoutBody>
                </Layout> 
            </SearchkitProvider>
	</AppCanvas >
    );
  }
} 

App.childContextTypes = {
  muiTheme: React.PropTypes.object,
};


/*
 <TextField style={{width:'100%' }}  
                inputStyle={{color: ActiveTheme.palette.alternateTextColor}}
                hintStyle ={{color: ActiveTheme.palette.primary3Color}}
                hintText="Search"
             />
 */