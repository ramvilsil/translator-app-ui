import React, { useState } from 'react';
import { View } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import AvailableLanguages from '../enums/AvailableLanguages';

interface DropdownSelectProps {
    onValueChange: (value: string) => void;
}

const DropdownSelect = ({ onValueChange }: DropdownSelectProps) => {
    const [selectedValue, setSelectedValue] = useState('');

    const handleValueChange = (value: string) => {
        setSelectedValue(value);
        onValueChange(value);
    };

    const availableLanguageItems = Object.values(AvailableLanguages).map((language) => (
        <Picker.Item label={language} value={language.toLowerCase()} key={language} />
    ));

    return (
        <View>
            <Picker selectedValue={selectedValue} onValueChange={handleValueChange}>
                {availableLanguageItems}
            </Picker>
        </View>
    );
};

export default DropdownSelect;