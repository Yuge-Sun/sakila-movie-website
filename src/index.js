import React , { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './main.css'


function Welcome() {
    return (
      <div>
        {TopNav()}
        <br/>
        {Trailer()}
        <br/>
        {WhatsOn()}
        <br/>
        {TopFilms()}
        <br/>
        <div className='content'>
        {DisplayMovies ()}
        </div>
      </div>
    );
}

function ShowDescription() {
    const rand = Math.floor(Math.random() * 1000);
    const mySQL = GetResponse(`https://sakila-1668609746572.azurewebsites.net/home/findFilmById/${rand}`);

    return(
        <div>
            <br/>
            <h3>{mySQL.myResponse.title}</h3>
            {mySQL.myResponse.description}
        </div>
    )
}


function GetResponse(url) {
    const [myResponse, setResponse] = useState("");

    const getResponse = async () =>{
        const res = await fetch(url);
        const response = await res.json();
        setResponse(response);
    }

    useEffect(() =>
    {
        getResponse();
    },[])

    return(
        {myResponse}
    )
}

  
function TopNav() {
    return (
        <div class="topnav link center whatson">
            <a class="active" href="#home"><img src="./logo.jpg" alt="cat image"/></a>
            <div class="topnavtext">
            <div>
                <span>
                <a href="#whats-on">WHAT'S ON</a>
                </span>
            </div>
            <div>
                <span>
                <a href="#contact">BIG SCREEN EVENTS</a>
                </span>
            </div>
            <div>
                <span>
                <a href="#about">INSIDE VUE</a>   
                </span>
            </div>
            <div>
                <span>
                <a href="#whats-on">OFFERS</a>
                </span>
            </div>
            <div>
                <span>
                <a href="#contact">GIFT CARDS</a>
                </span>
            </div>
            <div>
                <span>
                <a href="#about">Log in</a>
                </span>
            </div>
            <div>
                <span>
                <a href="#about">Join</a>
                </span>
            </div>
        </div>
        </div>
    );
}
function Trailer() {
    return (
        <div class="whatson">
            <h2 class="center">
                <iframe width="1111" height="625" src="https://www.youtube.com/embed/X0tOpBuYasI" title="The Lion King | Original Trailer | Disney+" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </h2>
        </div>
    );
}
function WhatsOn() {
    return (
        <div class="whatson">
            <h1>
                WHAT'S ON AT
                <select name="cars" id="cars">
                    <option value="choose">Chosse your Vue</option>
                    <option value="Aberdeen">Aberdeen</option>
                    <option value="Inverness">Inverness</option>
                    <option value="London">London</option>
                  </select>
                  <input type="text" placeholder="Start typing a film or event"/>
                  <br/>
            </h1>
            <div>
                <img width="500" height="285" src="https://www.myvue.com/-/media/images/film%20and%20events/august%202022/film/black_adam_herom.jpg?h=315&hash=3CB49843003D838F7DD5ECD56EEE0251627D013F"/>
                <img width="500" height="285" src="https://www.myvue.com/-/media/images/film%20and%20events/june%202022/film/matilda-hero-m.jpg?h=315&hash=258905CA7685385ED8565524FE35E78998DA14B1"/>
                <img width="500" height="285" src="https://www.myvue.com/-/media/images/film%20and%20events/october%202022/events/liam-gallagher-herom.jpg?h=315&hash=816F7DD82D23E5A8F062EF3DED918D6BED1830A8"/>           
            </div>
        </div>
    )
}
function TopFilms() {
    return (
        <div>
            <h1>TOP FILMS</h1>
            <form id="form">
                <input
                    type="text"
                    id="search"
                    placeholder="Search"
                    class="search"
                />
            </form>
        </div>
    );
}
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const MovieList = (props) => {
	return (
		<>
			{props.movies.map((movie, index) => (
				<div className='movie'>
					<img src={IMGPATH + movie.poster_path} alt='movie'></img>
                        <div class="overview">
                            <h3></h3>
                            {ShowDescription()}
                        </div>
				</div>
			))}
		</>
	);
};


function DisplayMovies ()  {
	const [movies, setMovies] = useState([]);
        const getMovieRequest = async () => {
            const url = `https://api.themoviedb.org/3/discover/movie?api_key=04c35731a5ee918f014970082a0088b1`;
    
            const response = await fetch(url).catch(console.error);
            const responseJson = await response.json();
    
            if (responseJson.results) {
                console.log(response.results);
                setMovies(responseJson.results);
            }
        };
        useEffect(() => {
            getMovieRequest();
        }, []);
	return (
		<div className='container-fluid movie-app'>
			<div className='row'>
				<MovieList movies={movies} />
			</div>
		</div>
	);
};



  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(<Welcome />);
