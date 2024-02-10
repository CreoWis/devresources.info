import InfiniteScroll from "react-infinite-scroll-component";
import { getUpcomingConferences } from "../../service/api/conferenceAPI";
import { getCurrentDate, addQuotesToString } from "../../utils/utils";
import { useState } from "react";
import { ConferenceTable } from "../../components";

const InfiniteScrollComp = ({ data, hasNextPage, hasEndCursor }) => {
  const [confData, setConfData] = useState([...data]);
  const [hasMoreData, setHasMoreData] = useState(hasNextPage);
  const [endCursor, setEndCursor] = useState(hasEndCursor);

  const fetchData = async () => {
    const { data, hasEndCursor, hasNextPage } = await getUpcomingConferences(
      convertedDate,
      endCursor
    );
    setConfData((prev) => [...prev, ...data]);
    setHasMoreData(() => hasNextPage);
    setEndCursor(() => hasEndCursor);
  };

  const currentDate = getCurrentDate();
  const convertedDate = addQuotesToString(currentDate);

  const currentYear = currentDate.split("-")[0];

  return (
    <InfiniteScroll
      dataLength={confData.length}
      next={fetchData}
      hasMore={hasMoreData}
      loader={<h4>Loading...</h4>}
      endMessage={
        <p style={{ textAlign: "center" }}>
          <b>You have reached the end!</b>
        </p>
      }
    >
      <ConferenceTable data={confData} />
    </InfiniteScroll>
  );
};

export default InfiniteScrollComp;
