import moment from "moment";
import { useCallback, useEffect, useState } from "react";

export interface TimeIntervalsInterface {
    weak: 1,
    month: 2,
    quarter: 3,
    year: 4
}

const useDatePicker = (activeIntervalTab: number, timeIntervals: TimeIntervalsInterface) : any => {
    const now = moment().locale('ru');
    const initialDateTo = now;
    const [dateTo, setDateTo] = useState(initialDateTo);
    const [disabled, setDisabled] = useState(true)

    const getInitialDateFrom = useCallback(({ activeTab }: { activeTab: number }) => {
        switch (activeTab) {
            case timeIntervals.weak:
                return [moment(initialDateTo).isoWeekday(1), moment(initialDateTo)];
            case timeIntervals.month:
                return [moment(initialDateTo).startOf('month'), moment(initialDateTo)];
            case timeIntervals.quarter:
                return [moment().quarter(moment().quarter()).startOf('quarter'), moment(initialDateTo)];
            case timeIntervals.year:
                return [moment(initialDateTo).startOf('year'), moment(initialDateTo)];
            default: return [moment(initialDateTo).isoWeekday(1), moment(initialDateTo)]
        }
    }, []);

    const [dateFrom, setDateFrom] = useState(getInitialDateFrom({ activeTab: activeIntervalTab })[0]);

    const getPrevDates = useCallback((activeTab: number, dateToLocal: moment.Moment) : any => {
        setDisabled(false)
        switch (activeTab) {
            case timeIntervals.weak:
                return [moment(dateToLocal).subtract(7, 'days').isoWeekday(1), moment(dateToLocal).subtract(7, 'days').endOf('week')];
            case timeIntervals.month:
                return [moment(dateToLocal).subtract(1, 'months').startOf('month'), moment(dateToLocal).subtract(1, 'months').endOf('month')];
            case timeIntervals.quarter:
                return [moment(dateToLocal).subtract(3, 'months').startOf('quarter'), moment(dateToLocal).subtract(3, 'months').endOf('quarter')];
            case timeIntervals.year:
                return [moment(dateToLocal).subtract(1, 'year').startOf('year'), moment(dateToLocal).subtract(1, 'year').endOf('year')];
            default: return [moment(dateToLocal).isoWeekday(1), moment(dateToLocal).subtract(7, 'days')];
        }
    }, [activeIntervalTab]);

    // магические числа означают минимальную разницу между сегодняшней датой и той, которая в dateFrom
    const getDurationByStatusTab = useCallback((activeTab: number): number => {
        switch (activeTab) {
            case timeIntervals.weak:
                return 7;
            case timeIntervals.month:
                return 31;
            case timeIntervals.quarter:
                return 123;
            case timeIntervals.year:
                return 397;
            default: return 6;
        }
    }, [])

    const getNextDates = useCallback((activeTab: number, dateFromLocal: moment.Moment) : any => {
        const duration = moment.duration(now.diff(moment(dateTo)));
        if (Math.floor(duration.asDays()) < getDurationByStatusTab(activeTab)) {
            setDisabled(true);
            const [initialDateFromLocal, initialDateToLocal] = getInitialDateFrom({ activeTab });
            return [initialDateFromLocal, initialDateToLocal]
        }

        const futureWeek = moment(dateFromLocal).add(7, 'days').startOf('week');
        const futureWeekEnd = moment(futureWeek).endOf('week');

        const futureMonth = moment(dateFromLocal).add(1, 'months');
        const futureMonthEnd = moment(futureMonth).endOf('month');

        const futureYear = moment(dateFromLocal).add(12, 'months').startOf('year');
        const futureYearLastMonth = moment(futureYear).endOf('year');

        const futureQuarter = moment(dateFromLocal).add(3, 'months');
        const futureQuarterEnd = moment(futureQuarter).add(3, 'months').endOf('month');

        switch (activeTab) {
            case timeIntervals.weak:
                return [futureWeek, futureWeekEnd];
            case timeIntervals.month:
                return [futureMonth, futureMonthEnd];
            case timeIntervals.quarter:
                return [futureQuarter, futureQuarterEnd];
            case timeIntervals.year:
                return [futureYear, futureYearLastMonth];
            default: return [futureWeek, futureWeekEnd]
        }
    }, [dateFrom, activeIntervalTab, dateTo]);

    const onPrevDateClick = useCallback(() => {
        const [currentDateFrom, currentDateTo] = getPrevDates(activeIntervalTab, dateTo);
        setDateFrom(currentDateFrom);
        setDateTo(currentDateTo);
    }, [activeIntervalTab, dateTo]);

    const onNextDateClick = useCallback(() => {
        const [currentDateFrom, currentDateTo] = getNextDates(activeIntervalTab, dateFrom);
        setDateFrom(currentDateFrom);
        setDateTo(currentDateTo)
    }, [activeIntervalTab, dateFrom]);

    useEffect(() => {
        const [currentDateFrom, setCurrentDateTO] = getInitialDateFrom({ activeTab: activeIntervalTab });
        setDateFrom(currentDateFrom);
        setDateTo(setCurrentDateTO);
    }, [activeIntervalTab]);

    return [dateFrom, dateTo, onPrevDateClick, onNextDateClick, disabled]
};

export default useDatePicker;
