import { View, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { COLORS, SPACING } from '@/constants/theme';

interface ProgressStepsProps {
  steps: string[];
  currentStep: number;
}

export function ProgressSteps({ steps, currentStep }: ProgressStepsProps) {
  return (
    <View style={styles.container}>
      <View style={styles.stepsContainer}>
        {steps.map((step, index) => (
          <View key={index} style={styles.stepWrapper}>
            <View
              style={[
                styles.stepCircle,
                index < currentStep
                  ? styles.completedStep
                  : index === currentStep
                  ? styles.activeStep
                  : styles.inactiveStep,
              ]}
            >
              <ThemedText
                style={[
                  styles.stepNumber,
                  index < currentStep || index === currentStep
                    ? styles.activeStepText
                    : styles.inactiveStepText,
                ]}
              >
                {index + 1}
              </ThemedText>
            </View>
            {index < steps.length - 1 && (
              <View
                style={[
                  styles.stepLine,
                  index < currentStep
                    ? styles.completedStepLine
                    : styles.inactiveStepLine,
                ]}
              />
            )}
          </View>
        ))}
      </View>
      <View style={styles.labelsContainer}>
        {steps.map((step, index) => (
          <ThemedText
            key={index}
            style={[
              styles.stepLabel,
              index === currentStep
                ? styles.activeStepLabel
                : styles.inactiveStepLabel,
              index === 0
                ? { alignSelf: 'flex-start' }
                : index === steps.length - 1
                ? { alignSelf: 'flex-end' }
                : {},
            ]}
            numberOfLines={1}
          >
            {step}
          </ThemedText>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: SPACING.lg,
  },
  stepsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stepWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  stepCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  activeStep: {
    backgroundColor: COLORS.primary,
  },
  completedStep: {
    backgroundColor: COLORS.primary,
  },
  inactiveStep: {
    backgroundColor: COLORS.lightGray,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  stepNumber: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  activeStepText: {
    color: COLORS.white,
  },
  inactiveStepText: {
    color: COLORS.gray,
  },
  stepLine: {
    flex: 1,
    height: 2,
  },
  completedStepLine: {
    backgroundColor: COLORS.primary,
  },
  inactiveStepLine: {
    backgroundColor: COLORS.border,
  },
  labelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SPACING.xs,
  },
  stepLabel: {
    fontSize: 12,
    textAlign: 'center',
    flex: 1,
  },
  activeStepLabel: {
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  inactiveStepLabel: {
    color: COLORS.gray,
  },
});
