

export default (props) =>  {
        return (
            <div>
                <Nav />
                <div className="content">
                    <Route exact path="/" component={MapView} />
                    <Route exact path="/artwork" component={Artwork} />
                    <Route path="/artwork/:id" component={NewPiece} />
                    <Route exact path="/artists" component={Artists} />
                    <Route path="/artists/:id" component={NewArtist} />
                    <Route exact path="/locations" component={Locations} />
                    <Route path="/locations/:id" component={NewLocation} />
                </div>
                <Footer />
            </div>
        )
    }
}
