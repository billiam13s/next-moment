next moment is use for calculate the next sequence of timed event from basic config object. (ie: calendar repeat event, repeat schedule tasks)

- minutely
- hourly
- daily
- weekly
- monthly

```
start = moment();
options = {
    repeat: "minutely|hourly|daily|weekly|monthly",
    interval: 1, //
    end_at: moment|date, //optional, no repeat beyond this date
}

// optional weekly options
// options.days_week = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]

// monthly options
// options.monthly_repeat_by: "day_of_month|day_of_week"
// day_of_week is **incomplete**

// optional monthly option
// options.stick_to_last_day = true // stick to the end of the month

nm = new NextMoment(start, options);
nm.getNext();
```

## TODO

1. getNext().getNext()
2. yearly
