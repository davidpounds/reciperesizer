import React, { useState } from 'react';
import { 
    TEMPERATURE_UNIT,
    TEMPERATURE_RANGE, 
    TemperatureConversionResult,
    temperatureConversions, 
    convertTemperature, 
} from '../utils';

const makeRange = (min: number, max: number, step: number): number[] => {
    const range: number[] = [];
    for (let i = min; i <= max; i += step) range.push(i);
    return range;
};

const Temperature: React.FC<{}> = () => {
    const gasMarkOptions = temperatureConversions.map(tc => tc.gasMark);
    const celsiusOptions = makeRange(TEMPERATURE_RANGE[TEMPERATURE_UNIT.C].min, TEMPERATURE_RANGE[TEMPERATURE_UNIT.C].max, 5);
    const farenheitOptions = makeRange(TEMPERATURE_RANGE[TEMPERATURE_UNIT.F].min, TEMPERATURE_RANGE[TEMPERATURE_UNIT.F].max, 5);

    const initialState: TemperatureConversionResult = convertTemperature(TEMPERATURE_RANGE[TEMPERATURE_UNIT.C].min, TEMPERATURE_UNIT.C);

    const [celsius, setCelsius] = useState(initialState[TEMPERATURE_UNIT.C]);
    const [farenheit, setFarenheit] = useState(initialState[TEMPERATURE_UNIT.F]);
    const [gasMark, setGasMark] = useState(initialState[TEMPERATURE_UNIT.GM]);

    const changeHandlerFactory = (fromUnit: TEMPERATURE_UNIT): React.ChangeEventHandler<HTMLSelectElement> => (e: React.ChangeEvent<HTMLSelectElement>) => {
        const fromValue = fromUnit === TEMPERATURE_UNIT.GM ? e.target.value : +e.target.value;
        const updatedState: TemperatureConversionResult = convertTemperature(fromValue, fromUnit);
        console.log({ fromValue, updatedState });
        setCelsius(updatedState[TEMPERATURE_UNIT.C]);
        setFarenheit(updatedState[TEMPERATURE_UNIT.F]);
        setGasMark(updatedState[TEMPERATURE_UNIT.GM]);    
    };
    const celsiusChangeHandler = changeHandlerFactory(TEMPERATURE_UNIT.C);
    const farenheitChangeHandler = changeHandlerFactory(TEMPERATURE_UNIT.F);
    const gasMarkChangeHandler = changeHandlerFactory(TEMPERATURE_UNIT.GM);

    return (
        <div className="panel temperatures">
            <h2>Temperatures</h2>
            <div className="form-group">
                <label htmlFor="celsius">Celsius</label>
                <select className="form-control" id="celsius" value={celsius} onChange={celsiusChangeHandler}>
                    {celsiusOptions.map(c => (
                        <option key={c} value={c}>{c}</option>
                    ))}
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="farenheit">Farenheit</label>
                <select className="form-control" id="farenheit" value={farenheit} onChange={farenheitChangeHandler}>
                    {farenheitOptions.map(f => (
                        <option key={f} value={f}>{f}</option>
                    ))}
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="gasmark">Gas mark</label>
                <select className="form-control" id="gasmark" value={gasMark} onChange={gasMarkChangeHandler}>
                    {gasMarkOptions.map(gm => (
                        <option key={gm} value={gm}>{gm}</option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default Temperature;
