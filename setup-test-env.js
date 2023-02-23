import '@testing-library/jest-native/extend-expect'
import {server} from './app/mocks/server'
// include this line for mocking react-native-gesture-handler
// import 'react-native-gesture-handler/jestSetup';

// // include this section and the NativeAnimatedHelper section for mocking react-native-reanimated
// jest.mock('react-native-reanimated', () => {
//   const Reanimated = require('react-native-reanimated/mock');

//   // The mock for `call` immediately calls the callback which is incorrect
//   // So we override it with a no-op
//   Reanimated.default.call = () => {};

//   return Reanimated;
// });

// // Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
// jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

// jest.mock('@react-navigation/native', () => {
// 	const actualNav = jest.requireActual('@react-navigation/native')
// 	return {
// 		...actualNav,
// 		useNavigation: () => ({
// 			navigate: jest.fn(),
// 			dispatch: jest.fn()
// 		})
// 	}
// })

// Establish API mocking before all tests.
beforeAll(() => server.listen())
// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers())
// Clean up after the tests are finished.
afterAll(() => server.close())
