function AuthForm({
  fields,
  error = "",
  success = "",
  submitting = false,
  submitLabel,
  submittingLabel,
  onSubmit,
}) {
  return (
    <form onSubmit={onSubmit}>
      {fields.map((field) => (
        <div key={field.id}>
          <label htmlFor={field.id}>{field.label}</label>

          <input
            id={field.id}
            name={field.id}
            type={field.type}
            value={field.value}
            onChange={field.onChange}
            required={field.required}
            minLength={field.minLength}
            maxLength={field.maxLength}
          />
        </div>
      ))}

      {error && <p role="alert">{error}</p>}

      {success && <p role="status">{success}</p>}

      <button type="submit" disabled={submitting}>
        {submitting ? submittingLabel : submitLabel}
      </button>
    </form>
  );
}

export default AuthForm;
