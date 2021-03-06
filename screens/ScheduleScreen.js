import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CourseList from '../components/CourseList';
import Banner from '../components/Banner';
import UserContext from '../UserContext';

const ScheduleScreen = ({navigation}) => {

    const user = useContext(UserContext);
    const canEdit = user && user.role === 'admin';
    const [schedule, setSchedule] = useState({ title: '', courses: [] });

    const url = 'https://courses.cs.northwestern.edu/394/data/cs-courses.php';

    const view = (course) => {
        navigation.navigate(canEdit ? 'CourseEditScreen' : 'CourseDetailScreen', { course });
    };

    useEffect( () => {
    const fetchSchedule = async () => {
        const response = await fetch(url);
        if (!response.ok) throw response;
        const json = await response.json();
        setSchedule(json);
    }
    fetchSchedule();
    }, []);
    return (
    <SafeAreaView style={styles.container}>
        <Banner title={schedule.title} error={schedule.error} />
        <CourseList courses={schedule.courses} view={view} />
    </SafeAreaView>
    );
};
    
const styles = StyleSheet.create({
    container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
    },
});
export default ScheduleScreen;