import React, { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';

interface ValidationRule {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    custom?: (value: string) => string | null;
    message?: string;
}

interface FormFieldProps {
    name: string;
    label: string;
    type?: string;
    value: string;
    onChange: (name: string, value: string) => void;
    validation?: ValidationRule;
    error?: string;
    touched?: boolean;
    placeholder?: string;
    disabled?: boolean;
    className?: string;
}

export function FormField({
    name,
    label,
    type = 'text',
    value,
    onChange,
    validation,
    error,
    touched = false,
    placeholder,
    disabled = false,
    className = '',
}: FormFieldProps) {
    const [localError, setLocalError] = useState<string | null>(null);
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        if (validation && touched) {
            const error = validateField(value, validation);
            setLocalError(error);
            setIsValid(!error && value.length > 0);
        }
    }, [value, validation, touched]);

    const validateField = (value: string, rules: ValidationRule): string | null => {
        if (rules.required && !value.trim()) {
            return rules.message || `${label} is required`;
        }

        if (rules.minLength && value.length < rules.minLength) {
            return rules.message || `${label} must be at least ${rules.minLength} characters`;
        }

        if (rules.maxLength && value.length > rules.maxLength) {
            return rules.message || `${label} must not exceed ${rules.maxLength} characters`;
        }

        if (rules.pattern && !rules.pattern.test(value)) {
            return rules.message || `${label} format is invalid`;
        }

        if (rules.custom) {
            const customError = rules.custom(value);
            if (customError) return customError;
        }

        return null;
    };

    const displayError = error || localError;

    return (
        <div className={className}>
            <label className="block text-sm font-medium text-gray-700 mb-2">
                {label}
                {validation?.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <div className="relative">
                <input
                    type={type}
                    name={name}
                    value={value}
                    onChange={(e) => onChange(name, e.target.value)}
                    placeholder={placeholder}
                    disabled={disabled}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition ${
                        displayError
                            ? 'border-red-300 focus:ring-red-500'
                            : isValid
                            ? 'border-green-300 focus:ring-green-500'
                            : 'border-gray-300'
                    } ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                />
                {isValid && !displayError && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                    </div>
                )}
                {displayError && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <AlertCircle className="w-5 h-5 text-red-500" />
                    </div>
                )}
            </div>
            {displayError && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {displayError}
                </p>
            )}
        </div>
    );
}

// Common validation patterns
export const validationPatterns = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    phone: /^[0-9]{10,15}$/,
    username: /^[a-zA-Z0-9_]{3,20}$/,
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/,
    nis: /^[0-9]{10,20}$/,
};

// Validation schemas
export const validationSchemas = {
    username: {
        required: true,
        minLength: 3,
        maxLength: 20,
        pattern: validationPatterns.username,
        message: 'Username must be 3-20 characters (letters, numbers, underscore only)',
    },
    email: {
        required: true,
        pattern: validationPatterns.email,
        message: 'Please enter a valid email address',
    },
    password: {
        required: true,
        minLength: 8,
        pattern: validationPatterns.password,
        message: 'Password must be at least 8 characters with uppercase, lowercase, and number',
    },
    fullName: {
        required: true,
        minLength: 2,
        maxLength: 100,
        message: 'Full name must be 2-100 characters',
    },
    phone: {
        required: true,
        pattern: validationPatterns.phone,
        message: 'Please enter a valid phone number (10-15 digits)',
    },
    nis: {
        required: true,
        pattern: validationPatterns.nis,
        message: 'NIS must be 10-20 digits',
    },
};

// Form container component
interface FormProps {
    children: React.ReactNode;
    onSubmit: (e: React.FormEvent) => void;
    className?: string;
}

export function Form({ children, onSubmit, className = '' }: FormProps) {
    return (
        <form onSubmit={onSubmit} className={className}>
            {children}
        </form>
    );
}
