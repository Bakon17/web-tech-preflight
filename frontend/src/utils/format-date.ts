export function formatDate(date: string) {
  // App.tsx-тің ішіндегі formatDate функциясының ішінде не болды, соны дәл осы жерге қойыңыз. 
  // Егер ол қазір жоқ болса, маған App.tsx кодыңызды жіберіңіз, мен дұрыстап беремін.
 
  return new Date(date).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}
