// export default () => {
//   const { chapters } = useCourse();
//   return chapters[0].lessons[0];
// };

export default async () => {
  const course = await useCourse();
  return course.value.chapters[0].lessons[0];
};
