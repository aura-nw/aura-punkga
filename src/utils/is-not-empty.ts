import {
  compose,
  not, isEmpty
} from "ramda";

export const isNotEmpty = compose(not, isEmpty);
