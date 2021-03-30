import React, {useEffect} from "react"
import {useParams} from "react-router-dom"
import {Helmet} from "react-helmet"
import {connect} from "react-redux"
import propertyActions from "../actions/property-actions"
import ListingCard from "./listing-card"
import {PROPERTY_TYPE_SALE} from "../search/search-bar"

const SaleSearchResult = (
    {
        saleListings = [],
        findSaleListings
    }) => {

    const {location} = useParams()

    useEffect(() => {
        findSaleListings(location)
    }, [location])

    return (
        <div className="container">
            <Helmet>
                <title>Homes for Sale in {location} | Cupola</title>
            </Helmet>
            <h1>Real Estate & Homes For Sale in {location}</h1>
            <p>{saleListings.length} results</p>
            <div className="search-result-grid">
                <div className="row">
                    {
                        saleListings.map((s, index) =>
                            <ListingCard listing={s}
                                         type={PROPERTY_TYPE_SALE}
                                         location={location}
                                         gallery="https://i.ytimg.com/vi/bIONUutiutk/maxresdefault.jpg"
                                         key={index} />
                        )
                    }
                </div>
            </div>
        </div>
    )
}

const stpm = (state) => ({
    saleListings: state.saleListingReducer.saleListings
})

const dtpm = (dispatch) => ({
    findSaleListings: (location) => {
        try {
            propertyActions.findSaleListings(dispatch, {location})
        } catch (e) {
            alert(e.message)
        }
    }
})

export default connect
(stpm, dtpm)
(SaleSearchResult)