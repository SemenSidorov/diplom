import moment from "moment";
import { useCallback, useState } from "react";
import useEffectWithSkipDidMount from "./useEffectWithSkipDidMount";
import {DATE_FILTER_KEYS} from "./Constants";

const useDatePicker = (activeIntervalTab: number, timeIntervals: typeof DATE_FILTER_KEYS) => {
    const now = moment().locale('ru');
    const initialDateTo = now;
    const [disabled, setDisabled] = useState(true);

    const getInitialDateFrom = useCallback(({ activeTab }) => {
        switch (activeTab) {
            case timeIntervals.day:
                return [moment(initialDateTo), moment(initialDateTo)];
            case timeIntervals.weak:
                return [moment(initialDateTo), moment(initialDateTo).endOf('week').add(1,'days')];
            case timeIntervals.month:
                return [moment(initialDateTo).startOf('month'), moment(initialDateTo).endOf('month')];
            default: return [moment(initialDateTo).startOf('month'), moment(initialDateTo)];
        }
    }, []);

    const [dateFrom, setDateFrom] = useState(getInitialDateFrom({ activeTab: activeIntervalTab })[0]);


    const [dateTo, setDateTo] = useState(getInitialDateFrom({ activeTab: activeIntervalTab })[1]);

    // магические числа означают минимальную разницу между сегодняшней датой и той, которая в dateFrom
    const getDurationByStatusTab = useCallback((activeTab) => {
        switch (activeTab) {
            case timeIntervals.weak:
                return 7;
            case timeIntervals.month:
                return 31;
            case timeIntervals.day:
                return 1;
            default: return 1;
        }
    }, [])

    const getPrevDates = useCallback((activeTab, dateToLocal) => {
        const duration = moment.duration(dateToLocal.diff(moment(now)));
        if (Math.floor(duration.asDays()) <= getDurationByStatusTab(activeTab)) {
            setDisabled(true);
            const [initialDateFromLocal, initialDateToLocal] = getInitialDateFrom({ activeTab });
            return [initialDateFromLocal, initialDateToLocal]
        }
        switch (activeTab) {
            case timeIntervals.day:
                return [moment(dateToLocal).subtract(1, 'days'), moment(dateToLocal).subtract(1, 'days')];
            case timeIntervals.weak:
                return [moment(dateToLocal).subtract(7, 'days').isoWeekday(1), moment(dateToLocal).subtract(7, 'days')];
            case timeIntervals.month:
                return [moment(dateToLocal).subtract(1, 'months').startOf('month'), moment(dateToLocal).subtract(1, 'months').endOf('month')];
            default: return [moment(dateToLocal).subtract(1, 'days'), moment(dateToLocal).subtract(1, 'days')];
        }
    }, [activeIntervalTab]);


    const getNextDates = useCallback((activeTab, dateFromLocal) => {
        const futureWeek = moment(dateFromLocal).add(1, 'week');
        const futureWeekEnd = moment(futureWeek).add(6, 'days');

        const futureMonth = moment(dateFromLocal).add(1, 'months');
        const futureMonthEnd = moment(futureMonth).endOf('month');

        const futureDay = moment(dateFromLocal).add(1, 'days')

        switch (activeTab) {
            case timeIntervals.day:
                return [futureDay, futureDay];
            case timeIntervals.weak:
                return [futureWeek, futureWeekEnd];
            case timeIntervals.month:
                return [futureMonth, futureMonthEnd];
            default: return [futureDay, futureDay];
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

    useEffectWithSkipDidMount(() => {
        const [currentDateFrom, setCurrentDateTO] = getInitialDateFrom({ activeTab: activeIntervalTab });
        setDateFrom(currentDateFrom);
        setDateTo(setCurrentDateTO);
    }, [activeIntervalTab], () => {});

    return [dateFrom, dateTo, onPrevDateClick, onNextDateClick, disabled]
};

export default useDatePicker;
