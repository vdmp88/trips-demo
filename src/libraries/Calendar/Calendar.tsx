// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
/* eslint-disable */

import React, {
  forwardRef,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';
import classNames from 'classnames';
import styles from './Calendar.module.css';

import {
  convertToDateObject,
  getCalendarDate,
  getDateBySelectionType,
  getMonthDetails,
  isDateDisabled,
  isDateInRange,
  isDateSelected,
  isDisableDateInRange,
  isSameDateAs,
  isToday,
} from './utils';

import { useForkedRef } from './useForkedRef';
import { useStateWithCallback } from './useStateWithCallback';
import Image from 'next/image';
import ChevronLeft from '@/icons/chevronleft.svg';
import ChevronRight from '@/icons/chevronright.svg';

export type CalendarProps = {
  /**
   * A string that provides an accessible label for the button that navigates to the next month in the calendar. This label is read by screen readers to describe the action associated with the button.
   *
   * @since 5.5.0
   */
  ariaNavNextMonthLabel?: string;
  /**
   * A string that provides an accessible label for the button that navigates to the previous month in the calendar. Screen readers will use this label to explain the purpose of the button.
   *
   * @since 5.5.0
   */
  ariaNavPrevMonthLabel?: string;
  /**
   * Default date of the component
   */
  calendarDate?: Date | string | null;
  /**
   * The number of calendars that render on desktop devices.
   */
  calendars?: number;
  /**
   * A string of all className you want applied to the component.
   */
  className?: string;
  /**
   * Set the format of day name.
   *
   * @default 'numeric'
   * @since 4.3.0
   */
  dayFormat?: 'numeric' | '2-digit' | ((date: Date) => string | number);
  /**
   * Specify the list of dates that cannot be selected.
   */
  disabledDates?: Date[] | Date[][] | (Date | Date[])[];
  /**
   * Initial selected to date (range).
   */
  endDate?: Date | string | null;
  /**
   * Sets the day of start week.
   * - 0 - Sunday,
   * - 1 - Monday,
   * - 2 - Tuesday,
   * - 3 - Wednesday,
   * - 4 - Thursday,
   * - 5 - Friday,
   * - 6 - Saturday,
   *
   * @default 1
   */
  firstDayOfWeek?: number;
  /**
   * Sets the default locale for components. If not set, it is inherited from the browser.
   *
   * @default 'default'
   */
  locale?: string;
  /**
   * Max selectable date.
   */
  maxDate?: Date | string | null;
  /**
   * Min selectable date.
   */
  minDate?: Date | string | null;
  /**
   * Show arrows navigation.
   */
  navigation?: boolean;
  /**
   * The custom next icon.
   */
  navNextIcon?: ReactNode;
  /**
   * The custom next double icon.
   */
  navNextDoubleIcon?: ReactNode;
  /**
   * The custom prev icon.
   */
  navPrevIcon?: ReactNode;
  /**
   * The custom prev double icon.
   */
  navPrevDoubleIcon?: ReactNode;
  /**
   * Reorder year-month navigation, and render year first.
   *
   * @since 4.3.0
   */
  navYearFirst?: boolean;
  /**
   * Allow range selection.
   */
  range?: boolean;
  /**
   * Set whether days in adjacent months shown before or after the current month are selectable. This only applies if the `showAdjacementDays` option is set to true.
   *
   * @since 4.11.0
   */
  selectAdjacementDays?: boolean;
  /**
   * Set whether to display dates in adjacent months (non-selectable) at the start and end of the current month.
   *
   * @since 4.11.0
   */
  showAdjacementDays?: boolean;
  /**
   * Set whether to display week numbers in the calendar.
   *
   * @since 5.0.0
   */
  showWeekNumber?: boolean;
  /**
   * Toggle select mode between start and end date.
   */
  selectEndDate?: boolean;
  /**
   * Specify the type of date selection as day, week, month, or year.
   *
   * @since 5.0.0
   */
  selectionType?: 'day' | 'week' | 'month' | 'year';
  /**
   * Initial selected date.
   */
  startDate?: Date | string | null;
  /**
   * Set length or format of day name.
   *
   * @default 2
   */
  weekdayFormat?:
    | number
    | 'long'
    | 'narrow'
    | 'short'
    | ((date: Date) => string | number);
  /**
   * Label displayed over week numbers in the calendar.
   *
   * @since 5.0.0
   */
  weekNumbersLabel?: string;
  /**
   * Callback fired when the calendar date changed.
   */
  onCalendarDateChange?: (date: Date | string) => void;
  /**
   * Callback fired when the start date changed.
   */
  onStartDateChange?: (date: Date | null) => void;
  /**
   * Callback fired when the end date changed.
   */
  onEndDateChange?: (date: Date | null) => void;
  /**
   * Callback fired when the selection type changed.
   */
  onSelectEndChange?: (value: boolean) => void;
  /**
   * Callback fired when the view type of calendar changed.
   */
  onViewChanged?: (view: string) => void;
};

const CalendarContent = (props: {
  calendarDate: Date;
  dayFormat?: 'numeric' | '2-digit' | ((date: Date) => string | number);
  disabledDates?: Date[] | Date[][] | (Date | Date[])[];
  endDate: Date | null;
  firstDayOfWeek: number;
  locale: string;
  maxDate: Date | null;
  minDate: Date | null;
  onCalendarClick: (date: Date) => void;
  order: number;
  selectAdjacementDays: boolean;
  selectEndDate: boolean | undefined;
  selectionType: 'day' | 'week' | 'month' | 'year';
  showAdjacementDays: boolean;
  startDate: Date | null;
  view: 'days' | 'months' | 'years';
  weekdayFormat:
    | number
    | 'long'
    | 'narrow'
    | 'short'
    | ((date: Date) => string | number);
}) => {
  const {
    calendarDate,
    dayFormat,
    disabledDates,
    endDate,
    firstDayOfWeek,

    locale,
    maxDate,
    minDate,
    onCalendarClick,
    selectAdjacementDays,
    selectionType,
    showAdjacementDays,
    startDate,
    view,
  } = props;

  const monthDetails = getMonthDetails(
    calendarDate.getFullYear(),
    calendarDate.getMonth(),
    firstDayOfWeek
  );

  const weekDays = monthDetails[0].days;

  return (
    <div className="calendar-body">
      {view === 'days' && (
        <div className="calendar-header">
          {weekDays.map(({ date }: { date: Date }, idx: number) => (
            <div className="calendar-week-day" key={idx}>
              <span className="calendar-week-day-content">
                {date
                  .toLocaleDateString(locale, { weekday: 'long' })
                  .slice(0, 3)}
              </span>
            </div>
          ))}
        </div>
      )}
      <div className="calendar-content">
        {view === 'days' &&
          monthDetails.map((week, index) => (
            <React.Fragment key={index}>
              {week.days.map(
                (
                  { date, month }: { date: Date; month: string },
                  idx: number
                ) => {
                  const isDisabled = isDateDisabled(
                    date,
                    minDate,
                    maxDate,
                    disabledDates
                  );
                  const isSelected = isDateSelected(date, startDate, endDate);
                  return month === 'current' || showAdjacementDays ? (
                    <div
                      className={classNames('calendar-cell', {
                        ...(selectionType === 'day' && {
                          clickable:
                            month !== 'current' && selectAdjacementDays,
                          disabled: isDisabled,
                          range:
                            month === 'current' &&
                            isDateInRange(date, startDate, endDate),
                          selected: isSelected,
                          rangeStart:
                            isSelected && date.getDay() === startDate?.getDay(),
                          rangeEnd:
                            isSelected && date.getDay() === endDate?.getDay(),
                          rangeBothEnds:
                            isSelected &&
                            date.getDay() === startDate?.getDay() &&
                            !endDate,
                        }),
                        [month]: true,
                        today: month === 'current' && isToday(date),
                      })}
                      key={idx}
                      tabIndex={
                        selectionType === 'day' &&
                        (month === 'current' || selectAdjacementDays) &&
                        !isDisabled
                          ? 0
                          : -1
                      }
                      title={date.toLocaleDateString(locale)}
                      {...(isSelected && { 'aria-selected': true })}
                      {...(selectionType === 'day' &&
                        (month === 'current' || selectAdjacementDays) && {
                          onClick: () => onCalendarClick(date),
                        })}
                    >
                      <div className="calendar-cell-inner">
                        {typeof dayFormat === 'function'
                          ? dayFormat(date)
                          : date.toLocaleDateString(locale, {
                              day: dayFormat,
                            })}
                      </div>
                    </div>
                  ) : (
                    <div className="calendar-cell-empty" key={idx}></div>
                  );
                }
              )}
            </React.Fragment>
          ))}
      </div>
    </div>
  );
};

const Navigation = (props: {
  ariaNavNextMonthLabel: string;
  ariaNavPrevMonthLabel: string;
  calendarDate: Date;
  locale: string;
  navigation: boolean;
  navYearFirst: boolean | undefined;
  onNavigationClick: (direction: string, double?: boolean) => void;
  view: 'days' | 'months' | 'years';
}) => {
  const {
    ariaNavNextMonthLabel,
    ariaNavPrevMonthLabel,
    calendarDate,
    locale,
    navigation,
    navYearFirst,
    onNavigationClick,
    view,
  } = props;

  return (
    <div className="calendar-nav">
      {navigation && (
        <div className="calendar-nav-prev">
          {view === 'days' && (
            <button
              color="transparent"
              aria-label={ariaNavPrevMonthLabel}
              onClick={() => onNavigationClick('prev')}
            >
              <Image src={ChevronLeft} alt="calendar-nav-prev" />
            </button>
          )}
        </div>
      )}
      <div
        className="calendar-nav-date"
        aria-live="polite"
        {...(navYearFirst && {
          style: { display: 'flex', justifyContent: 'center' },
        })}
      >
        {view === 'days' && (
          <span color="transparent">
            {calendarDate &&
              calendarDate.toLocaleDateString(locale, { month: 'long' })}
          </span>
        )}
      </div>
      {navigation && (
        <div className="calendar-nav-next">
          {view === 'days' && (
            <button
              color="transparent"
              aria-label={ariaNavNextMonthLabel}
              onClick={() => onNavigationClick('next')}
            >
              <Image src={ChevronRight} alt="calendar-nav-next" />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export const Calendar = forwardRef<HTMLDivElement, CalendarProps>(
  (
    {
      ariaNavNextMonthLabel = 'Next month',
      ariaNavPrevMonthLabel = 'Previous month',
      startDate,
      endDate,
      calendarDate = startDate || endDate || null,
      calendars = 1,
      className,
      dayFormat = 'numeric',
      disabledDates,
      firstDayOfWeek = 1,
      locale = 'default',
      maxDate,
      minDate,
      navigation = true,
      navYearFirst,
      range,
      selectAdjacementDays = false,
      selectEndDate,
      selectionType = 'day',
      showAdjacementDays = true,
      showWeekNumber = false,
      weekdayFormat = 2,
      onCalendarDateChange,
      onEndDateChange,
      onStartDateChange,
      onSelectEndChange,
      onViewChanged,
    },
    ref
  ) => {
    const calendarRef = useRef<HTMLDivElement>(null);
    const forkedRef = useForkedRef(ref, calendarRef);
    const isInitialMount = useRef(true);
    const [_calendarDate, setCalendarDate] = useState<Date | null>(new Date());

    useEffect(() => {
      if (selectionType === 'day' || selectionType === 'week') {
        setView('days');
        return;
      }

      if (selectionType === 'month') {
        setView('months');
        return;
      }

      if (selectionType === 'year') {
        setView('years');
        return;
      }
    }, [selectionType]);

    const [_startDate, setStartDate] = useStateWithCallback<Date | null>(
      startDate ? convertToDateObject(startDate, selectionType) : null,
      () =>
        onStartDateChange &&
        onStartDateChange(getDateBySelectionType(_startDate, selectionType)),
      !isInitialMount.current
    );
    useEffect(() => {
      const date = startDate
        ? convertToDateObject(startDate, selectionType)
        : null;
      if (!isSameDateAs(date, _startDate)) {
        setStartDate(date);
      }
    }, [startDate]);

    const [_endDate, setEndDate] = useStateWithCallback<Date | null>(
      endDate ? convertToDateObject(endDate, selectionType) : null,
      () =>
        onEndDateChange &&
        onEndDateChange(getDateBySelectionType(_endDate, selectionType)),
      !isInitialMount.current
    );
    useEffect(() => {
      const date = endDate ? convertToDateObject(endDate, selectionType) : null;
      if (!isSameDateAs(date, _endDate)) {
        setEndDate(date);
      }
    }, [endDate]);

    const [_maxDate, setMaxDate] = useState<Date | null>(
      maxDate ? convertToDateObject(maxDate, selectionType) : null
    );
    useEffect(() => {
      maxDate && setMaxDate(convertToDateObject(maxDate, selectionType));
    }, [maxDate]);

    const [_minDate, setMinDate] = useState<Date | null>(
      minDate ? convertToDateObject(minDate, selectionType) : null
    );
    useEffect(() => {
      minDate && setMinDate(convertToDateObject(minDate, selectionType));
    }, [minDate]);

    const [view, setView] = useStateWithCallback<'days' | 'months' | 'years'>(
      'days',
      onViewChanged
    );

    useEffect(() => {
      isInitialMount.current = false;
    }, []);

    const setCalendarPage = (years: number, months = 0, setMonth?: number) => {
      if (_calendarDate === null) {
        return;
      }

      const year = _calendarDate.getFullYear();
      const month = _calendarDate.getMonth();
      const d = new Date(year, month, 1);

      years && d.setFullYear(d.getFullYear() + years);
      months && d.setMonth(d.getMonth() + months);
      typeof setMonth === 'number' && d.setMonth(setMonth);

      setCalendarDate(d);
      onCalendarDateChange && onCalendarDateChange(d);
    };

    const handleCalendarClick = (date: Date, index?: number) => {
      if (isDateDisabled(date, _minDate, _maxDate, disabledDates)) {
        return;
      }

      const _date = new Date(date);

      if (view === 'months' && selectionType !== 'month') {
        setView('days');
        return;
      }

      if (view === 'years' && selectionType !== 'year') {
        setView('months');
        return;
      }

      if (range) {
        if (_startDate && _endDate) {
          setStartDate(date);
          setEndDate(null);
          return;
        }

        if (_startDate && !_endDate) {
          if (_startDate > date) {
            setStartDate(date);
            setEndDate(null);
            return;
          }
          setEndDate(date);
          return;
        }

        setStartDate(date);
        return;
      }

      setStartDate(date);
    };

    const handleNavigationOnClick = (direction: string, double = false) => {
      if (direction === 'prev') {
        if (double) {
          setCalendarPage(view === 'years' ? -10 : -1);
          return;
        }

        if (view !== 'days') {
          setCalendarPage(-1);
          return;
        }

        setCalendarPage(0, -1);
        return;
      }

      if (direction === 'next') {
        if (double) {
          setCalendarPage(view === 'years' ? 10 : 1);
          return;
        }

        if (view !== 'days') {
          setCalendarPage(1);
          return;
        }

        setCalendarPage(0, 1);
        return;
      }
    };

    return (
      <div
        className={classNames(
          'calendars',
          {
            [`select-${selectionType}`]: selectionType && view === 'days',
            'show-week-numbers': showWeekNumber,
          },
          styles.calendar,
          className
        )}
        ref={forkedRef}
      >
        {_calendarDate &&
          Array.from({ length: calendars }, (_, index) => {
            const calendarDate = getCalendarDate(_calendarDate, index, view);
            return (
              <div className={classNames('calendar', view)} key={index}>
                <Navigation
                  ariaNavNextMonthLabel={ariaNavNextMonthLabel}
                  ariaNavPrevMonthLabel={ariaNavPrevMonthLabel}
                  calendarDate={calendarDate}
                  locale={locale}
                  navigation={navigation}
                  navYearFirst={navYearFirst}
                  onNavigationClick={handleNavigationOnClick}
                  view={view}
                />
                <CalendarContent
                  calendarDate={calendarDate}
                  dayFormat={dayFormat}
                  disabledDates={disabledDates}
                  endDate={_endDate}
                  firstDayOfWeek={firstDayOfWeek}
                  locale={locale}
                  maxDate={_maxDate}
                  minDate={_minDate}
                  onCalendarClick={(date) => handleCalendarClick(date, index)}
                  order={index}
                  selectAdjacementDays={selectAdjacementDays}
                  selectionType={selectionType}
                  showAdjacementDays={showAdjacementDays}
                  startDate={_startDate}
                  view={view}
                  weekdayFormat={weekdayFormat}
                />
              </div>
            );
          })}
      </div>
    );
  }
);

Calendar.displayName = 'Calendar';
