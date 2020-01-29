import React from "react";
import { Typography, Divider } from "@material-ui/core";
import { isEmpty } from "ramda";
import Match from "./Match.js";
import Matches from "./Matches.js";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { findLiveMatches } from "../../utils/matchesFilters.js";
import ReactPaginate from "react-paginate";
import { setCurrentPagePaginationScheduled } from "../../actions/uiActions.js";
const ScheduledMatches = ({
  matches,
  pageNumbers,
  liveMatches,
  setCurrentPagePaginationScheduled
}) => (
  <div>
    <Divider style={{ marginBottom: "2px" }} />
    <Typography variant={"body1"} align={"center"} color={"textSecondary"}>
      Právě hraný zápas
    </Typography>
    {!isEmpty(liveMatches) ? (
      liveMatches.map(match => (
        <Link to={`/match/${match.id}`}key={match.id}>
          <Match match={match} />
        </Link>
      ))
    ) : (
      <Typography variant={"body1"} align={"center"} color={"textSecondary"}>
        Právě se nehraje žádný zápas
      </Typography>
    )}
    <Divider style={{ marginTop: "15px", marginBottom: "2px" }} />
    <Typography variant={"body1"} align={"center"} color={"textSecondary"}>
      Nadcházející zápasy
    </Typography>
    {pageNumbers <= 1 ? null : (
      <ReactPaginate
        previousLabel={"<"}
        nextLabel={">"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={pageNumbers}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={({ selected }) =>
          setCurrentPagePaginationScheduled(selected)
        }
        containerClassName={"pagination"}
        subContainerClassName={"pages pagination"}
        activeClassName={"active"}
      />
    )}

    <Matches pageNumbersScheduled={pageNumbers} />
  </div>
);
export default connect(
  state => {
    const postsPerPageScheduled = 3;
    const currentPageScheduled = state.ui.paginationCurrentPageScheduled + 1;
    const indexOfLastPostScheduled =
      currentPageScheduled * postsPerPageScheduled;
    const indexOfFirstPostScheduled =
      indexOfLastPostScheduled - postsPerPageScheduled;
    const matchesScheduledAll = state.matches.matches.filter(
      (match, index) => match.finished === 0 && match.live === 0
    );
    const matchesScheduled = matchesScheduledAll.slice(
      indexOfFirstPostScheduled,
      indexOfLastPostScheduled
    );
    return {
      liveMatches: findLiveMatches(state.matches.matches),
      pageNumbers: Math.ceil(matchesScheduledAll.length / 3)
    };
  },
  { setCurrentPagePaginationScheduled }
)(ScheduledMatches);
