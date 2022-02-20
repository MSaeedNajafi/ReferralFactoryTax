import React, { useState, useEffect } from "react";

export const usePagedData = (campaignId, page, pageSize) => {
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState([]);
  const [token, setToken] = useState(
    "aOIKFDPV2GVd7lvbQCz1t08sgvJto5N0dCWLaACKTxypWpsnGJjoDPtQ8SjXTtc7gCCc1xkkPYHLpQif"
  );
  const months = [
    "January",
    "February ",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  useEffect(() => {
    const loadPageData = async () => {
      setLoading(true);

      const users = await fetchAllUsers(page);

      const userRows = users
        // This looks suspicious - you might be losing users because they
        // don't match the campaign? Shouldn't you pass the campaignId
        // as part of the fetch in that case?
        .filter((user) => user.campaign_id == campaignId)
        .map((user, index) => ({
          id: index + 1,
          col1: index + 1,
          col2: user.id,
          col3: user.first_name,
          // col4: user.qualified,
          col5: user.email,
          col6: user.converted_referrals_count,
          // col6: user.source,
          // col7: user.referrer_id,

          // Not sure what these functions are??
          // col8: showName(user.referrer_id, users),
          // col9: props.users[i].url,
          // col10: "",

          // // This number will almost certainly be wrong since 'users' is
          // // the list of users for this page.
          // col11: "",
          col12: changeDate(user.qualified_at),
          // col13: "",
        }));

      setRows(userRows);
    };

    loadPageData();
  }, [campaignId, page, pageSize]);

  const fetchAllUsers = async (pageNumber) => {
    try {
      const response = await fetch(
        `https://referral-factory.com/api/v1/users?page=${pageNumber}&per_page=200`,
        {
          method: "GET",
          headers: new Headers({
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            with: "all",
          }),
        }
      );

      const { data } = await response.json();
      console.log("pageNumber: ", pageNumber, " <data> : ", data);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const changeDate = (date) => {
    // console.log(date);
    var d = new Date(date);
    // console.log(d);
    // console.log(month[d.getMonth()]);
    // console.log("=========");
    return months[d.getMonth()];
  };

  const showName = (id, users) => {
    const theUser = users.filter((u) => id == u.id);

    if (theUser.length > 0) {
      return theUser[0].first_name;
    }
    return "-";
  };

  return {
    rows,
    loading,
  };
};
